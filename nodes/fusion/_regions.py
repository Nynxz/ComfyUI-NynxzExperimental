"""Semantic weight fields for visual fusion — regions → a per-source blend over the token grid.

The fusion engine (`_fusion.py`) blends several sources' visual tokens on a shared spatial grid.
Where those blend weights come from used to be geometry only (checkerboard / block / dither) or
crude token statistics — both *blind* to what is actually in each image. This module lets a
**region** decide instead: "take the face from image 2 here, the background from image 1 there."

A region is the same normalised dict the parked regional layout uses
(`dev/regional/_regional.py`): `{x, y, w, h, shape, feather, strength, enabled}`, top-left origin,
0..1 on both axes, defined **relative to its source image**. That one schema is the shared
currency — a hand-drawn canvas and an LLM grounding pass both emit it, and both land here.

Two coordinate frames meet:

  * the **source frame** each region is drawn/grounded in, and
  * the shared **token grid** (`visual_height x visual_width`) the fusion weights live on.

Each source is placed into the grid by a fit mode (contain / cover / stretch), so a region has to
ride that same transform to land in the right cells — `region_to_grid` does exactly that, reusing
the geometry `fit_image` already applies to pixels. After that everything is in grid-normalised
space and `region_weights` rasterises it into the `[num_sources, tokens]` field the engine mixes
in through its existing `_combine_weights` seam.

`build_mask` here is the same rasteriser as the regional prototype; it is duplicated rather than
imported because `dev/` is unpublished (excluded from the ComfyUI registry via `.comfyignore`).
"""

from __future__ import annotations

import torch


def _smoothstep(t: torch.Tensor) -> torch.Tensor:
    t = t.clamp(0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def _num(region: dict, key: str, default: float) -> float:
    try:
        return float(region.get(key, default))
    except (TypeError, ValueError):
        return default


def region_strength(region: dict) -> float:
    """A region's relative prevalence in its source's mask. Default 1.0 = equal footing with a
    full-frame source in the same cell; raise it above 1 to make the region *dominate* its area."""
    return max(_num(region, "strength", 1.0), 0.0)


def region_pixel_box(region: dict, width: int, height: int) -> tuple[int, int, int, int]:
    """A region's `(left, top, right, bottom)` in whole pixels, clamped to the frame.

    For drawing a box over the source image that a region was defined on (its coords are that
    frame's 0..1). Pure geometry, so it's unit-tested without any rendering.
    """
    width = max(int(width), 1)
    height = max(int(height), 1)
    x = min(max(_num(region, "x", 0.0), 0.0), 1.0)
    y = min(max(_num(region, "y", 0.0), 0.0), 1.0)
    w = min(max(_num(region, "w", 0.0), 0.0), 1.0 - x)
    h = min(max(_num(region, "h", 0.0), 0.0), 1.0 - y)
    left = round(x * width)
    top = round(y * height)
    right = round((x + w) * width)
    bottom = round((y + h) * height)
    return left, top, right, bottom


def build_mask(region: dict, width: int, height: int) -> torch.Tensor:
    """Rasterise one grid-normalised region to an `[height, width]` soft mask in [0,1].

    Same rasteriser as the regional prototype: `{x, y, w, h}` rectangle (top-left origin, 0..1),
    a `shape` (rect/ellipse) and a `feather` (soft-edge width in normalised units). Coordinates
    are taken as-is, so callers pass regions already mapped into the grid frame (`region_to_grid`).
    """
    width = max(int(width), 1)
    height = max(int(height), 1)
    x = _num(region, "x", 0.0)
    y = _num(region, "y", 0.0)
    w = _num(region, "w", 1.0)
    h = _num(region, "h", 1.0)
    feather = max(_num(region, "feather", 0.0), 0.0)
    shape = region.get("shape", "rect")

    if w <= 0.0 or h <= 0.0:
        return torch.zeros((height, width), dtype=torch.float32)

    # Pixel-centre coordinates in [0,1].
    xs = (torch.arange(width, dtype=torch.float32) + 0.5) / width
    ys = (torch.arange(height, dtype=torch.float32) + 0.5) / height
    gx = xs.view(1, width).expand(height, width)
    gy = ys.view(height, 1).expand(height, width)

    x1, x2, y1, y2 = x, x + w, y, y + h

    if shape == "ellipse":
        cx, cy = (x1 + x2) * 0.5, (y1 + y2) * 0.5
        rx, ry = max(w * 0.5, 1e-6), max(h * 0.5, 1e-6)
        r = torch.sqrt(((gx - cx) / rx) ** 2 + ((gy - cy) / ry) ** 2)
        if feather <= 0.0:
            return (r <= 1.0).to(torch.float32)
        # 1 inside r <= 1-feather, ramping to 0 at the r = 1 boundary.
        return _smoothstep((1.0 - r) / feather)

    def ramp(coord: torch.Tensor, lo: float, hi: float) -> torch.Tensor:
        if feather <= 0.0:
            return ((coord >= lo) & (coord <= hi)).to(torch.float32)
        edge = torch.minimum((coord - lo) / feather, (hi - coord) / feather)
        return _smoothstep(edge)

    return (ramp(gx, x1, x2) * ramp(gy, y1, y2)).clamp(0.0, 1.0)


def region_to_grid(region: dict, fit: str, source_w: int, source_h: int, grid_w: int, grid_h: int):
    """Map a source-frame region into grid-normalised coordinates through the same `fit` transform
    that placed the source's pixels.

    A region is drawn/grounded on the *source* image; the source is then fitted into the shared
    grid by `fit` (contain letterboxes, cover center-crops, stretch distorts). The source frame
    therefore occupies a grid-normalised rectangle `[gx0, gy0]` of size `fx by fy`:

      * contain / cover — the source keeps its aspect (uniform scale), so it is centered; `fx`/`fy`
        are the source-frame extents in grid-norm (`< 1` for contain's letterbox, `> 1` for cover's
        overflow, which then clips). A single formula covers both — only the scale differs.
      * stretch — the source fills the grid on each axis independently, so `fx = fy = 1`.

    Returns a new region dict in grid-norm; `build_mask` (which clamps to the grid) handles the
    overflow/letterbox. Feather is scaled by the smaller axis factor so its width stays roughly the
    same fraction of the frame it was authored against.
    """
    source_w = max(int(source_w), 1)
    source_h = max(int(source_h), 1)
    grid_w = max(int(grid_w), 1)
    grid_h = max(int(grid_h), 1)

    if fit == "stretch":
        fx = fy = 1.0
    else:
        scale = (
            max(grid_w / source_w, grid_h / source_h)
            if fit == "cover"
            else min(grid_w / source_w, grid_h / source_h)  # contain (and the safe default)
        )
        fx = source_w * scale / grid_w
        fy = source_h * scale / grid_h

    gx0 = 0.5 - fx / 2.0
    gy0 = 0.5 - fy / 2.0

    mapped = dict(region)
    mapped["x"] = gx0 + _num(region, "x", 0.0) * fx
    mapped["y"] = gy0 + _num(region, "y", 0.0) * fy
    mapped["w"] = _num(region, "w", 1.0) * fx
    mapped["h"] = _num(region, "h", 1.0) * fy
    feather = max(_num(region, "feather", 0.0), 0.0)
    if feather > 0.0:
        mapped["feather"] = feather * min(fx, fy)
    return mapped


def _grounded_mask(regions, visual_height, visual_width):
    """A grounded source's strength-weighted claim over the grid, or None if it has no regions.

    None marks a *fill* (base-layer) source. Regions are strength-weighted and unioned (max) so
    overlapping regions don't stack past their own strength. Regions that rasterise to nothing
    (off-grid / zero area) also count as no claim -> None, so the source becomes fill rather than a
    black hole.
    """
    enabled = [r for r in (regions or []) if isinstance(r, dict) and r.get("enabled") is not False]
    if not enabled:
        return None
    acc = torch.zeros((visual_height, visual_width), dtype=torch.float32)
    for region in enabled:
        acc = torch.maximum(
            acc, build_mask(region, visual_width, visual_height) * region_strength(region)
        )
    if float(acc.max()) <= 0.0:
        return None
    return acc.flatten()


def region_weights(regions_per_source, visual_height, visual_width, device):
    """Layered semantic blend weights over the token grid: `[num_sources, tokens]`.

    Compositing, not proportional mixing — this is what makes a grounded insert actually win its
    area instead of being diluted by a full-frame background:

      * **Grounded** sources (those with regions) are foreground layers. Together they *claim* each
        token up to 100% (`claim = min(1, sum of their strength-weighted masks)`), split among
        themselves by mask where they overlap. A single grounded region at strength >= 1 therefore
        *owns* its box outright — the background is carved out there.
      * **Fill** sources (no regions) are the base layer: they evenly share whatever the grounded
        layers leave (`residual = 1 - claim`). So a full-frame background owns everything *outside*
        the grounded boxes, and nothing inside them.

    Flattened row-major (H then W) to match the engine's token order. `dead` marks tokens no source
    claims at all (every source grounded, none covering) so the caller can fall back to an even
    blend there instead of the geometric mosaic.
    """
    n = len(regions_per_source)
    tokens = visual_height * visual_width
    weights = torch.zeros(n, tokens, device=device)

    grounded, fill = {}, []
    for i, regions in enumerate(regions_per_source):
        mask = _grounded_mask(regions, visual_height, visual_width)
        if mask is None:
            fill.append(i)
        else:
            grounded[i] = mask.to(device)

    total_g = torch.zeros(tokens, device=device)
    for mask in grounded.values():
        total_g = total_g + mask
    claim = total_g.clamp(0.0, 1.0)  # foreground layers take up to the whole token
    for i, mask in grounded.items():
        weights[i] = torch.where(total_g > 1e-6, mask / total_g.clamp_min(1e-6) * claim, weights[i])
    if fill:
        share = (1.0 - claim) / len(fill)  # base layers split the residual
        for i in fill:
            weights[i] = share

    totals = weights.sum(dim=0)
    dead = totals <= 1e-6  # nothing here (all grounded, none covering) -> caller's even blend
    weights = weights / totals.clamp_min(1e-6)
    return weights, dead
