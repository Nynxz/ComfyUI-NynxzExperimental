"""Staged-composite math for Fusion Studio — placement, blend, feather, alpha-over.

Pure torch, no ComfyUI import, so it's offline-testable by path like `_regions.py`
(the node module `fusion_studio.py` owns everything comfy-flavoured — image IO, folder
resolution, the matte model). Two jobs live here:

  * **Composite** — fit each layer into its box on a shared canvas and alpha-over the
    stack back-to-front, honouring per-layer opacity, blend mode and feather. Produces
    the node's IMAGE + MASK outputs.
  * **Placed frames** — the *same* per-layer canvas-sized frame is what Fusion Studio
    hands the fusion engine as a source. Sent with `fit="stretch"` (canvas aspect ==
    grid aspect, so no distortion) and a region == the layer's box, `region_to_grid`
    (`_regions.py`) becomes the identity and the region lands exactly where the pixels
    did. So the composite and the spatial fusion always agree — one placement routine
    feeds both.

Coordinates: a layer's `{x, y, w, h}` are 0..1 on the canvas (top-left origin), the same
frame the region uses. `fit` is how the *source* frames into its box (contain / cover /
stretch), independent of where the box sits.
"""

from __future__ import annotations

import torch
import torch.nn.functional as F

# Mirrors _fusion.FIT_MODES / DEFAULT_FIT (kept local so this module stays comfy-free).
FIT_MODES = ("contain", "cover", "stretch")
DEFAULT_FIT = "contain"

BLEND_MODES = (
    "normal",
    "multiply",
    "screen",
    "overlay",
    "soft_light",
    "hard_light",
    "darken",
    "lighten",
    "difference",
    "exclusion",
    "add",
    "subtract",
    "color_dodge",
    "color_burn",
)
DEFAULT_BLEND = "normal"

FUSE_MODES = ("layers", "flattened", "off")
DEFAULT_FUSE = "layers"


# --- coercion / normalization --------------------------------------------------------
def _f(value, default: float) -> float:
    try:
        out = float(value)
    except (TypeError, ValueError):
        return default
    return out if out == out else default  # NaN guard


def _clamp(value, lo: float, hi: float, default: float) -> float:
    return min(max(_f(value, default), lo), hi)


def _i(value, default: int) -> int:
    try:
        return round(float(value))
    except (TypeError, ValueError):
        return default


def normalize_layer(raw: dict, index: int = 0) -> dict:
    """Coerce one raw layer dict from the widget into a validated layer."""
    o = raw if isinstance(raw, dict) else {}
    fit = o.get("fit")
    blend = o.get("blend")
    return {
        "id": str(o.get("id") or f"l{index}"),
        "ref": str(o.get("ref") or ""),
        "type": o.get("type") if o.get("type") in ("input", "temp", "output") else "input",
        "x": _clamp(o.get("x"), 0.0, 1.0, 0.1),
        "y": _clamp(o.get("y"), 0.0, 1.0, 0.1),
        "w": _clamp(o.get("w"), 0.0, 1.0, 0.4),
        "h": _clamp(o.get("h"), 0.0, 1.0, 0.4),
        "fit": fit if fit in FIT_MODES else DEFAULT_FIT,
        "opacity": _clamp(o.get("opacity"), 0.0, 1.0, 1.0),
        "blend": blend if blend in BLEND_MODES else DEFAULT_BLEND,
        "feather": _clamp(o.get("feather"), 0.0, 0.5, 0.0),
        "flip_h": bool(o.get("flip_h", False)),
        "flip_v": bool(o.get("flip_v", False)),
        "matte": bool(o.get("matte", False)),
        "on": o.get("on", True) is not False,
        "strength": max(0.0, _f(o.get("strength"), 1.0)),
        "label": str(o.get("label") or o.get("ref") or f"layer {index + 1}"),
    }


def normalize_stage(raw) -> dict:
    """Coerce the whole stage widget value into a validated `{canvas, background, layers,
    fuse_as}`. Accepts the dict directly (the widget serializes a dict, not a JSON string)."""
    o = raw if isinstance(raw, dict) else {}
    canvas = o.get("canvas") if isinstance(o.get("canvas"), dict) else {}
    bg = o.get("background") if isinstance(o.get("background"), dict) else {}
    layers_raw = o.get("layers") if isinstance(o.get("layers"), list) else []
    fuse = o.get("fuse_as")
    return {
        "version": 1,
        "canvas": {
            "width": max(64, min(4096, _i(canvas.get("width"), 1024))),
            "height": max(64, min(4096, _i(canvas.get("height"), 1024))),
        },
        "background": {
            "ref": str(bg.get("ref") or ""),
            "type": bg.get("type") if bg.get("type") in ("input", "temp", "output") else "input",
            "color": str(bg.get("color") or "#000000"),
        },
        "layers": [normalize_layer(row, i) for i, row in enumerate(layers_raw)],
        "fuse_as": fuse if fuse in FUSE_MODES else DEFAULT_FUSE,
    }


def hex_to_rgb(value: str) -> tuple[float, float, float]:
    """`#rrggbb` (or `#rgb`) → three 0..1 floats. Falls back to black on anything odd."""
    s = str(value or "").lstrip("#").strip()
    if len(s) == 3:
        s = "".join(ch * 2 for ch in s)
    if len(s) != 6:
        return (0.0, 0.0, 0.0)
    try:
        # type: ignore[return-value]
        return tuple(int(s[i : i + 2], 16) / 255.0 for i in (0, 2, 4))
    except ValueError:
        return (0.0, 0.0, 0.0)


# --- tensor helpers ------------------------------------------------------------------
def _to_bchw(image: torch.Tensor) -> torch.Tensor:
    """[H,W,C] or [1,H,W,C] → [1,C,H,W] float."""
    if image.ndim == 3:
        image = image.unsqueeze(0)
    return image.movedim(-1, 1).to(torch.float32)


def _resize(bchw: torch.Tensor, out_w: int, out_h: int) -> torch.Tensor:
    """Resample [1,C,H,W] to (out_h, out_w). Antialiased bicubic when shrinking a dim."""
    out_w, out_h = max(1, out_w), max(1, out_h)
    ih, iw = bchw.shape[-2], bchw.shape[-1]
    if (iw, ih) == (out_w, out_h):
        return bchw
    down = out_w < iw or out_h < ih
    out = F.interpolate(
        bchw, size=(out_h, out_w), mode="bicubic", align_corners=False, antialias=down
    )
    return out.clamp(0.0, 1.0)


def _split_rgba(image: torch.Tensor) -> tuple[torch.Tensor, torch.Tensor]:
    """A [1,C,H,W] source → (rgb [1,3,H,W], alpha [1,1,H,W]). Missing alpha = fully opaque."""
    rgb = image[:, :3]
    if image.shape[1] >= 4:
        alpha = image[:, 3:4]
    else:
        alpha = torch.ones((image.shape[0], 1, image.shape[2], image.shape[3]), dtype=image.dtype)
    return rgb, alpha


def fit_into(
    src: torch.Tensor, box_w: int, box_h: int, fit: str
) -> tuple[torch.Tensor, torch.Tensor]:
    """Frame a source into a `box_w`x`box_h` tile per `fit`.

    Returns (rgb [box_h,box_w,3], alpha [box_h,box_w]). contain letterboxes (transparent
    bars, alpha 0), cover center-crops the overflow, stretch distorts to fill.
    """
    box_w, box_h = max(1, box_w), max(1, box_h)
    bchw = _to_bchw(src)
    rgb, alpha = _split_rgba(bchw)
    sh, sw = bchw.shape[-2], bchw.shape[-1]

    if fit == "stretch":
        rgb = _resize(rgb, box_w, box_h)
        alpha = _resize(alpha, box_w, box_h)
        return rgb[0].movedim(0, -1), alpha[0, 0]

    scale = max(box_w / sw, box_h / sh) if fit == "cover" else min(box_w / sw, box_h / sh)
    inner_w = max(1, round(sw * scale))
    inner_h = max(1, round(sh * scale))
    rgb = _resize(rgb, inner_w, inner_h)
    alpha = _resize(alpha, inner_w, inner_h)

    if fit == "cover":
        # Center-crop the overflow down to the box.
        top = max(0, (inner_h - box_h) // 2)
        left = max(0, (inner_w - box_w) // 2)
        rgb = rgb[:, :, top : top + box_h, left : left + box_w]
        alpha = alpha[:, :, top : top + box_h, left : left + box_w]
        return rgb[0].movedim(0, -1), alpha[0, 0]

    # contain — paste centered into a transparent box.
    tile_rgb = torch.zeros((box_h, box_w, 3), dtype=torch.float32)
    tile_alpha = torch.zeros((box_h, box_w), dtype=torch.float32)
    top = max(0, (box_h - inner_h) // 2)
    left = max(0, (box_w - inner_w) // 2)
    ph, pw = min(inner_h, box_h), min(inner_w, box_w)
    tile_rgb[top : top + ph, left : left + pw] = rgb[0, :, :ph, :pw].movedim(0, -1)
    tile_alpha[top : top + ph, left : left + pw] = alpha[0, 0, :ph, :pw]
    return tile_rgb, tile_alpha


def _gaussian_blur(alpha: torch.Tensor, radius: int) -> torch.Tensor:
    """Separable box-approx blur of an [H,W] mask by `radius` px (cheap, edge-soft enough)."""
    if radius <= 0:
        return alpha
    k = radius * 2 + 1
    kernel = torch.ones(1, 1, 1, k, dtype=torch.float32) / k
    x = alpha.view(1, 1, *alpha.shape)
    x = F.pad(x, (radius, radius, 0, 0), mode="replicate")
    x = F.conv2d(x, kernel)
    x = F.pad(x, (0, 0, radius, radius), mode="replicate")
    x = F.conv2d(x, kernel.movedim(-1, -2))
    return x[0, 0].clamp(0.0, 1.0)


def feather_alpha(alpha: torch.Tensor, radius_px: int) -> torch.Tensor:
    """Inward-soft feather: blur the edge but never push it past the original coverage, so a
    layer's footprint doesn't grow (min against the source keeps the interior solid)."""
    if radius_px <= 0:
        return alpha
    return torch.minimum(alpha, _gaussian_blur(alpha, radius_px))


def place_layer(
    src: torch.Tensor, canvas_w: int, canvas_h: int, box: dict, fit: str, feather: float
) -> tuple[torch.Tensor, torch.Tensor]:
    """Fit `src` into its box and paste it into a canvas-sized frame.

    Returns (frame [canvas_h,canvas_w,3], alpha [canvas_h,canvas_w]). `frame` is the layer's
    pixels inside the box on black elsewhere — this is both the composite input and the
    fusion source. `box` is `{x,y,w,h}` in 0..1; `feather` is 0..0.5 in canvas units.
    """
    canvas_w, canvas_h = max(1, canvas_w), max(1, canvas_h)
    frame = torch.zeros((canvas_h, canvas_w, 3), dtype=torch.float32)
    alpha = torch.zeros((canvas_h, canvas_w), dtype=torch.float32)

    bx = round(_clamp(box.get("x"), 0.0, 1.0, 0.0) * canvas_w)
    by = round(_clamp(box.get("y"), 0.0, 1.0, 0.0) * canvas_h)
    bw = round(_clamp(box.get("w"), 0.0, 1.0, 0.0) * canvas_w)
    bh = round(_clamp(box.get("h"), 0.0, 1.0, 0.0) * canvas_h)
    if bw < 1 or bh < 1:
        return frame, alpha

    tile_rgb, tile_alpha = fit_into(src, bw, bh, fit)

    # Clip the paste rect to the canvas (a box near the edge can round past it).
    dx0, dy0 = max(0, bx), max(0, by)
    dx1, dy1 = min(canvas_w, bx + bw), min(canvas_h, by + bh)
    if dx1 <= dx0 or dy1 <= dy0:
        return frame, alpha
    sx0, sy0 = dx0 - bx, dy0 - by
    frame[dy0:dy1, dx0:dx1] = tile_rgb[sy0 : sy0 + (dy1 - dy0), sx0 : sx0 + (dx1 - dx0)]
    alpha[dy0:dy1, dx0:dx1] = tile_alpha[sy0 : sy0 + (dy1 - dy0), sx0 : sx0 + (dx1 - dx0)]

    if feather > 0.0:
        alpha = feather_alpha(alpha, round(feather * min(canvas_w, canvas_h) * 0.5))
    return frame, alpha


# --- blend modes ---------------------------------------------------------------------
def blend_pixels(base: torch.Tensor, top: torch.Tensor, mode: str) -> torch.Tensor:
    """Combine two [H,W,3] layers by `mode` (before the alpha-over). All inputs/outputs 0..1."""
    if mode == "normal":
        return top
    if mode == "multiply":
        return base * top
    if mode == "screen":
        return 1.0 - (1.0 - base) * (1.0 - top)
    if mode == "add":
        return (base + top).clamp(0.0, 1.0)
    if mode == "subtract":
        return (base - top).clamp(0.0, 1.0)
    if mode == "darken":
        return torch.minimum(base, top)
    if mode == "lighten":
        return torch.maximum(base, top)
    if mode == "difference":
        return (base - top).abs()
    if mode == "exclusion":
        return base + top - 2.0 * base * top
    if mode == "overlay":
        return torch.where(base <= 0.5, 2.0 * base * top, 1.0 - 2.0 * (1.0 - base) * (1.0 - top))
    if mode == "hard_light":
        return torch.where(top <= 0.5, 2.0 * base * top, 1.0 - 2.0 * (1.0 - base) * (1.0 - top))
    if mode == "soft_light":  # Pegtop — smooth, branch-free
        return (1.0 - 2.0 * top) * base * base + 2.0 * top * base
    if mode == "color_dodge":
        return torch.where(top >= 1.0, torch.ones_like(base), (base / (1.0 - top)).clamp(0.0, 1.0))
    if mode == "color_burn":
        return torch.where(
            top <= 0.0, torch.zeros_like(base), (1.0 - (1.0 - base) / top).clamp(0.0, 1.0)
        )
    return top


def composite(
    background: torch.Tensor, placed: list[tuple[torch.Tensor, torch.Tensor, float, str]]
) -> tuple[torch.Tensor, torch.Tensor]:
    """Alpha-over `placed` layers (back-to-front) onto `background`.

    `background` is [H,W,3]; each `placed` item is (frame [H,W,3], alpha [H,W], opacity, mode).
    Returns (composite [1,H,W,3], union_mask [1,H,W]) ready to hand back as IMAGE / MASK.
    """
    comp = background.clone()
    union = torch.zeros(background.shape[:2], dtype=torch.float32)
    for frame, alpha, opacity, mode in placed:
        a = (alpha * float(opacity)).clamp(0.0, 1.0)
        a3 = a.unsqueeze(-1)
        blended = blend_pixels(comp, frame, mode)
        comp = comp * (1.0 - a3) + blended * a3
        union = union + a * (1.0 - union)
    return comp.clamp(0.0, 1.0).unsqueeze(0), union.unsqueeze(0)
