"""Spatial visual-token fusion for Qwen3-VL image editing — the shared engine.

Encodes several source images independently through a Qwen3-VL text encoder and
combines their *visual* conditioning tokens on a shared spatial grid. The legacy
approach hard-picked one source per grid cell (a checkerboard/block mosaic). This
version generalizes that into a soft weight field so cell boundaries can feather
and multiple sources can contribute to the same token.

Every fusion node in this pack drives `encode_fusion` — there is exactly one copy of
the math. The pipeline is split into reusable pieces so we can grow it later:
  * `_fusion_weights(...) -> [sources, tokens]`  — where the blend weights come
    from. Today: geometric patterns, optionally feathered. Future: content
    saliency / cross-source attention plug in here.
  * `_content_weights(...)`                      — data-driven weights from the tokens.
  * `_strength_weights(...)`                     — per-source prevalence, applied last so
    it scales whatever the geometry/content stages decided.
  * `_blend(visuals, weights, ...)`              — how weights combine embeddings
    (weighted sum with optional norm preservation so blends don't wash out).
"""

import math
from dataclasses import dataclass

import torch
import torch.nn.functional as F

import comfy.utils
import node_helpers
from comfy_api.latest import io

try:
    # Newer cores expose the sizing rule; older ones keep it inline in
    # `process_qwen2vl_images`, so fall back to a copy of it. Preferring the core function
    # means this pack tracks the encoder automatically once the core has it.
    from comfy.text_encoders.qwen_vl import qwen2vl_image_size
except ImportError:
    def qwen2vl_image_size(height, width, min_pixels=3136, max_pixels=12845056, patch_size=14, merge_size=2):
        factor = patch_size * merge_size
        resized_height = round(height / factor) * factor
        resized_width = round(width / factor) * factor

        if resized_height * resized_width > max_pixels:
            beta = math.sqrt((height * width) / max_pixels)
            resized_height = max(factor, math.floor(height / beta / factor) * factor)
            resized_width = max(factor, math.floor(width / beta / factor) * factor)
        elif resized_height * resized_width < min_pixels:
            beta = math.sqrt(min_pixels / (height * width))
            resized_height = math.ceil(height * beta / factor) * factor
            resized_width = math.ceil(width * beta / factor) * factor

        return resized_height, resized_width

FUSION_METHODS = ["spatial-checkerboard", "spatial-block-interleave", "spatial-dither-random"]
CONTENT_MODES = ["none", "saliency", "energy", "cross-attention"]
FIT_MODES = ["cover", "contain", "stretch"]

# Explicit aspect choices for the visual grid; "auto" takes it from the first source.
ASPECTS = {"1:1": 1.0, "4:3": 4 / 3, "3:4": 3 / 4, "16:9": 16 / 9, "9:16": 9 / 16, "3:2": 3 / 2, "2:3": 2 / 3}
ASPECT_OPTIONS = ["auto", *ASPECTS]


@dataclass
class FusionSettings:
    """The fusion knobs.

    Defaults are the half-feathered blend, not the hard mosaic the node originally shipped —
    set `blend_strength=0.0` for that.
    """

    fusion_method: str = "spatial-checkerboard"
    block_size: int = 2
    dither_ratio: float = 0.5
    blend_strength: float = 0.5
    feather: float = 1.0
    preserve_norm: bool = True
    content_mode: str = "none"
    content_strength: float = 0.0
    content_temperature: float = 1.0
    seed: int = 0
    visual_aspect: str = "auto"
    visual_size: int = 384


def _spatial_fusion_mask(height, width, num_sources, method, block_size, dither_ratio, device, seed=0):
    # Built on the CPU and moved, so a seed picks the same pattern regardless of the device
    # the encoder ran on — CUDA and CPU generators don't agree on a stream for a given seed.
    rows = torch.arange(height).unsqueeze(1)
    columns = torch.arange(width).unsqueeze(0)

    if method == "spatial-checkerboard":
        mask = (rows + columns) % num_sources
    elif method == "spatial-block-interleave":
        mask = (rows // block_size + columns // block_size) % num_sources
    elif method == "spatial-dither-random":
        generator = torch.Generator().manual_seed(seed)
        random = torch.rand((height, width), generator=generator)
        other_sources = 1 + ((rows + columns) % (num_sources - 1))
        mask = torch.where(random < dither_ratio, 0, other_sources)
    else:
        raise ValueError(f"Unsupported visual fusion method: {method}")
    return mask.flatten().to(device)


def _gaussian_blur2d(x, sigma, radius):
    """Separable gaussian blur over the spatial grid. x: [sources, 1, H, W]."""
    coords = torch.arange(-radius, radius + 1, device=x.device, dtype=x.dtype)
    kernel = torch.exp(-(coords ** 2) / (2.0 * sigma * sigma))
    kernel = kernel / kernel.sum()
    x = F.pad(x, (radius, radius, radius, radius), mode="reflect")
    x = F.conv2d(x, kernel.view(1, 1, 1, -1))
    x = F.conv2d(x, kernel.view(1, 1, -1, 1))
    return x


def _fusion_weights(height, width, num_sources, method, block_size, dither_ratio, feather, blend_strength, device, seed=0):
    """Per-source blend weights over the visual grid: [num_sources, tokens], columns sum to 1.

    `blend_strength` interpolates between the hard mosaic (0.0 == legacy behavior)
    and the feathered field (1.0). `feather` is the gaussian sigma, in grid cells,
    used to soften each source's territory. This is the seam where content-aware or
    cross-source-attention weighting will slot in later.
    """
    tokens = height * width
    assignment = _spatial_fusion_mask(height, width, num_sources, method, block_size, dither_ratio, device, seed)
    onehot = torch.zeros(num_sources, tokens, device=device, dtype=torch.float32)
    onehot.scatter_(0, assignment.unsqueeze(0).to(torch.int64), 1.0)

    radius = min(int(math.ceil(3.0 * feather)), min(height, width) - 1)
    if blend_strength <= 0.0 or feather <= 0.0 or radius < 1:
        return onehot

    soft = _gaussian_blur2d(onehot.view(num_sources, 1, height, width), feather, radius).view(num_sources, tokens)
    soft = soft / soft.sum(dim=0, keepdim=True).clamp_min(1e-6)
    weights = (1.0 - blend_strength) * onehot + blend_strength * soft
    return weights / weights.sum(dim=0, keepdim=True).clamp_min(1e-6)


def _blend(visuals, weights, preserve_norm=True):
    """Weighted combination of source tokens.

    visuals: [batch, tokens, sources, dim]; weights: [sources, tokens].
    With `preserve_norm`, each fused token is rescaled to the weighted-average norm
    of its contributors so averaging doesn't collapse the embedding magnitude.
    """
    per_token = weights.transpose(0, 1)  # [tokens, sources]
    fused = (visuals * per_token[None, :, :, None]).sum(dim=2)  # [batch, tokens, dim]
    if preserve_norm:
        source_norms = visuals.norm(dim=-1)  # [batch, tokens, sources]
        target = (source_norms * per_token[None]).sum(dim=-1)  # [batch, tokens]
        scale = target / fused.norm(dim=-1).clamp_min(1e-6)
        fused = fused * scale.unsqueeze(-1)
    return fused


def _content_weights(visuals, mode, temperature):
    """Data-driven blend weights derived from the token embeddings themselves.

    visuals: [batch, tokens, sources, dim] -> weights [sources, tokens].
    Weights are batch-averaged (conditioning batch is normally 1). A softmax over
    sources turns per-source scores into a distribution; lower `temperature` = a
    sharper, more winner-take-all choice.

    Modes:
      * "energy"          — score = token norm. The source with the strongest
                            signal in a cell wins.
      * "saliency"        — score = distance from that source's own mean token.
                            Foreground / high-information patches beat flat ones.
      * "cross-attention" — score = agreement with the per-cell consensus token
                            (a cross-attention where the query is the mean over
                            sources). Down-weights conflicting outliers -> smoother.
    """
    x = visuals.float().mean(dim=0)  # [tokens, sources, dim]
    dim = x.shape[-1]
    if mode == "energy":
        scores = x.norm(dim=-1)  # [tokens, sources]
    elif mode == "saliency":
        source_mean = x.mean(dim=0, keepdim=True)  # [1, sources, dim]
        scores = (x - source_mean).norm(dim=-1)
    elif mode == "cross-attention":
        query = x.mean(dim=1, keepdim=True)  # [tokens, 1, dim]
        scores = (x * query).sum(dim=-1) / math.sqrt(dim)
    else:
        raise ValueError(f"Unsupported content mode: {mode}")

    weights = torch.softmax(scores / max(temperature, 1e-3), dim=-1)  # over sources
    return weights.transpose(0, 1)  # [sources, tokens]


def _combine_weights(geometric, content, content_strength):
    """Convex mix of the geometric prior and content weights, renormalized per token."""
    weights = (1.0 - content_strength) * geometric + content_strength * content
    return weights / weights.sum(dim=0, keepdim=True).clamp_min(1e-6)


def _strength_weights(weights, strengths):
    """Scale each source's weight field by its strength, then renormalize per token.

    This is what makes a source "more prevalent": strength is relative, not absolute —
    doubling every strength changes nothing, while halving one source hands its share
    of each token to whoever else contributes there. Strength 0 mutes the source.

    Tokens where every contributor is muted would divide by zero, so they fall back to
    the un-scaled weights (better a geometric blend than a black hole in the grid).
    """
    if strengths is None:
        return weights
    scale = torch.tensor(strengths, device=weights.device, dtype=weights.dtype).unsqueeze(1)  # [sources, 1]
    if float(scale.sum()) <= 0.0:
        return weights  # everything muted — nothing meaningful to weight by

    scaled = weights * scale.clamp_min(0.0)
    totals = scaled.sum(dim=0, keepdim=True)  # [1, tokens]
    dead = totals <= 1e-6
    if bool(dead.any()):
        scaled = torch.where(dead.expand_as(scaled), weights, scaled)
        totals = scaled.sum(dim=0, keepdim=True)
    return scaled / totals.clamp_min(1e-6)


def _visual_token_span(tokens, cond_length, visual_tokens):
    if len(tokens) != 1:
        raise ValueError("Visual fusion requires a Qwen3-VL or Krea2 text encoder.")

    token_pairs = next(iter(tokens.values()))[0]
    image_positions = [i for i, pair in enumerate(token_pairs)
                       if isinstance(pair[0], dict) and pair[0].get("type") == "image"]
    if len(image_positions) != 1:
        raise ValueError("Visual fusion requires exactly one visual token block per encoding pass.")

    image_position = image_positions[0]
    if any(not isinstance(pair[0], (int, float)) for pair in token_pairs[image_position + 1:]):
        raise ValueError("Visual fusion does not support embeddings after the image token block.")

    end = cond_length - (len(token_pairs) - image_position - 1)
    start = end - visual_tokens
    if start < 0 or end > cond_length:
        raise ValueError("Could not locate the visual token block in the encoded conditioning.")
    return start, end


def _fuse_conditionings(conditionings, tokens, visual_height, visual_width, settings, strengths=None):
    schedule_count = len(conditionings[0])
    if any(len(source) != schedule_count for source in conditionings):
        raise ValueError("All visual fusion sources must use the same CLIP schedule.")

    visual_tokens = visual_height * visual_width
    fused = []
    for schedule in range(schedule_count):
        source_conds = [source[schedule][0] for source in conditionings]
        spans = [_visual_token_span(source_tokens, cond.shape[1], visual_tokens)
                 for source_tokens, cond in zip(tokens, source_conds)]
        if any(span != spans[0] for span in spans[1:]):
            raise ValueError("Visual fusion sources produced different token layouts.")

        start, end = spans[0]
        visuals = torch.stack([cond[:, start:end] for cond in source_conds], dim=2)
        weights = _fusion_weights(visual_height, visual_width, len(source_conds), settings.fusion_method,
                                  settings.block_size, settings.dither_ratio, settings.feather,
                                  settings.blend_strength, visuals.device, settings.seed)
        if settings.content_mode != "none" and settings.content_strength > 0.0:
            content = _content_weights(visuals, settings.content_mode, settings.content_temperature)
            weights = _combine_weights(weights, content, settings.content_strength)
        # Strength goes last: it re-weights whatever geometry + content settled on.
        weights = _strength_weights(weights, strengths)
        blended_visual = _blend(visuals, weights.to(visuals.dtype), settings.preserve_norm)

        blended = source_conds[0].clone()
        blended[:, start:end] = blended_visual
        fused.append([blended, conditionings[0][schedule][1].copy()])
    return fused


def flatten_images(images):
    """Autogrow IMAGE dict -> a flat list of single-frame [1, H, W, C] sources, in socket order."""
    sources = []
    for name in sorted(images, key=lambda value: int(value.rsplit("_", 1)[-1])):
        image = images[name]
        if image is None:
            continue
        if image.ndim == 3:
            image = image.unsqueeze(0)
        sources.extend(image[i:i + 1].clone() for i in range(image.shape[0]))
    return sources


def fit_image(source, width, height, fit="cover"):
    """Resample one [1, H, W, C] source into the shared (width, height) grid.

      * "cover"   — fill the frame, center-cropping the overflow (no distortion).
      * "contain" — fit the whole image inside, letterboxing the remainder in black.
      * "stretch" — squash to the exact frame, ignoring the source aspect.
    """
    samples = source[:, :, :, :3].movedim(-1, 1)  # [1, 3, H, W]
    if fit == "cover":
        out = comfy.utils.common_upscale(samples, width, height, "area", "center")
    elif fit == "stretch":
        out = comfy.utils.common_upscale(samples, width, height, "area", "disabled")
    elif fit == "contain":
        source_height, source_width = samples.shape[2], samples.shape[3]
        scale = min(width / source_width, height / source_height)
        inner_width = max(1, round(source_width * scale))
        inner_height = max(1, round(source_height * scale))
        resized = comfy.utils.common_upscale(samples, inner_width, inner_height, "area", "disabled")
        out = torch.zeros((samples.shape[0], samples.shape[1], height, width),
                          dtype=resized.dtype, device=resized.device)
        top = (height - inner_height) // 2
        left = (width - inner_width) // 2
        out[:, :, top:top + inner_height, left:left + inner_width] = resized
    else:
        raise ValueError(f"Unsupported fit mode: {fit}")
    return out.movedim(1, -1)


def _visual_grid(first, aspect, size):
    """Pixel dims for the encoder pass, as a `size`x`size`-area frame at the chosen aspect.

    "auto" keeps the original behavior: take the aspect from the first source.
    """
    total = float(size * size)
    if aspect == "auto":
        samples = first.movedim(-1, 1)  # [1, C, H, W]
        source_width, source_height = samples.shape[3], samples.shape[2]
        scale_by = math.sqrt(total / (source_width * source_height))
        return max(32, round(source_width * scale_by)), max(32, round(source_height * scale_by))
    ratio = ASPECTS.get(aspect)
    if ratio is None:
        raise ValueError(f"Unsupported visual aspect: {aspect}")
    return max(32, round(math.sqrt(total * ratio))), max(32, round(math.sqrt(total / ratio)))


def _reference_latents(vae, sources):
    ref_latents = []
    for source in sources:
        samples = source[:, :, :, :3].movedim(-1, 1)
        scale_by = math.sqrt((1024 * 1024) / (samples.shape[3] * samples.shape[2]))
        latent_width = max(8, round(samples.shape[3] * scale_by / 8.0) * 8)
        latent_height = max(8, round(samples.shape[2] * scale_by / 8.0) * 8)
        resized = comfy.utils.common_upscale(samples, latent_width, latent_height, "area", "disabled")
        ref_latents.append(vae.encode(resized.movedim(1, -1)))
    return ref_latents


PROMPT_TEMPLATE = (
    "<|im_start|>system\nDescribe the image by detailing the color, shape, size, texture, quantity, text, spatial relationships of the objects and background:<|im_end|>\n"
    "<|im_start|>user\n<|vision_start|><|image_pad|><|vision_end|>{prompt}<|im_end|>\n"
    "<|im_start|>assistant\n"
)


def encode_fusion(clip, prompt, sources, settings, strengths=None, fits=None, vae=None):
    """Encode each source through the Qwen3-VL encoder and fuse their visual tokens.

    sources:   list of [1, H, W, C] IMAGE tensors (at least two).
    strengths: per-source prevalence, or None for an even blend.
    fits:      per-source fit mode into the shared grid, or None for all-"cover"
               (what the original node did with its center crop).
    """
    if len(sources) < 2:
        raise ValueError("Visual fusion requires at least two images.")
    if strengths is not None and len(strengths) != len(sources):
        raise ValueError("Visual fusion got a strength list that doesn't match the sources.")
    if fits is not None and len(fits) != len(sources):
        raise ValueError("Visual fusion got a fit list that doesn't match the sources.")

    width, height = _visual_grid(sources[0], settings.visual_aspect, settings.visual_size)
    processed = [fit_image(source, width, height, (fits[i] if fits else "cover"))
                 for i, source in enumerate(sources)]

    # Ask the encoder's own sizing rule what grid it will produce rather than re-deriving it:
    # it also clamps to its min/max pixel budget, and a grid that disagrees with the encoder's
    # would slice the wrong span out of the conditioning.
    grid_height, grid_width = qwen2vl_image_size(height, width, patch_size=16, merge_size=2)
    visual_height, visual_width = grid_height // 32, grid_width // 32

    full_prompt = PROMPT_TEMPLATE.format(prompt=prompt)
    tokens = [clip.tokenize(full_prompt, images=[image]) for image in processed]
    token_key = next(iter(tokens[0]), None)
    if token_key not in ("qwen3vl_4b", "qwen3vl_8b") or any(next(iter(source_tokens), None) != token_key for source_tokens in tokens):
        raise ValueError("Visual fusion requires a Qwen3-VL or Krea2 text encoder.")

    conditionings = [clip.encode_from_tokens_scheduled(source_tokens) for source_tokens in tokens]
    conditioning = _fuse_conditionings(conditionings, tokens, visual_height, visual_width, settings, strengths)

    if vae is not None:
        conditioning = node_helpers.conditioning_set_values(
            conditioning, {"reference_latents": _reference_latents(vae, sources)}, append=True
        )
    return conditioning


def tuning_inputs() -> list[io.Input]:
    """The fusion tuning knobs every fusion node exposes — same ids, defaults and tooltips.

    Kept in declaration order so the original node's widget layout is unchanged.
    """
    return [
        io.Combo.Input("fusion_method", options=FUSION_METHODS, default="spatial-checkerboard"),
        io.Int.Input("block_size", default=2, min=1, max=8, step=1, advanced=True),
        io.Float.Input(
            "dither_ratio", default=0.5, min=0.0, max=1.0, step=0.01, advanced=True,
            tooltip="Probability of selecting the first source. Remaining sources are selected with a checkerboard pattern.",
        ),
        io.Float.Input(
            "blend_strength", default=0.5, min=0.0, max=1.0, step=0.01, advanced=True,
            tooltip="0.0 = hard per-cell mosaic (original behavior); 1.0 = fully feathered soft blend.",
        ),
        io.Float.Input(
            "feather", default=1.0, min=0.0, max=6.0, step=0.1, advanced=True,
            tooltip="Gaussian smoothing (in visual-grid cells) applied to each source's territory. Higher = softer transitions.",
        ),
        io.Boolean.Input(
            "preserve_norm", default=True, advanced=True,
            tooltip="Rescale blended tokens to preserve embedding magnitude, avoiding washed-out conditioning.",
        ),
        io.Combo.Input(
            "content_mode", options=CONTENT_MODES, default="none", advanced=True,
            tooltip="Derive blend weights from token content instead of geometry alone. "
                    "saliency = foreground wins; energy = strongest signal wins; "
                    "cross-attention = agreement with the per-cell consensus (smoother).",
        ),
        io.Float.Input(
            "content_strength", default=0.0, min=0.0, max=1.0, step=0.01, advanced=True,
            tooltip="How much content weighting overrides the geometric pattern. 0 = geometry only; 1 = content only.",
        ),
        io.Float.Input(
            "content_temperature", default=1.0, min=0.05, max=5.0, step=0.05, advanced=True,
            tooltip="Softmax temperature for content weights. Lower = sharper (winner-take-all); higher = softer mix.",
        ),
    ]


def seed_input() -> io.Input:
    return io.Int.Input("seed", default=0, min=0, max=0xffffffffffffffff, control_after_generate=True,
                        advanced=True, tooltip="Seed for the spatial-dither-random pattern.")
