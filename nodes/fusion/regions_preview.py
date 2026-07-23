"""Fusion Regions Preview — draw each source's regions on it, so you can see what got selected.

Takes a fusion_input (typically straight off Qwen3-VL Ground, or any node that attaches regions)
and renders each source image with its region boxes + labels overlaid, output as a list of images
— one per source, each at its own native size — you can drop a Preview Image on. A source with no
regions is shown dimmed — that's the "whole image, full-frame background" case, which is exactly
what a passthrough looks like.

This reads regions in each source's own 0..1 frame (`region_pixel_box`), the frame grounding boxes
are defined in — so the overlay is honest about what the encode will pick up. It's a debug/inspect
node: it does not alter the fusion_input.
"""

from __future__ import annotations

import numpy as np
import torch
from comfy_api.latest import io
from PIL import Image, ImageDraw

from .._base import NynxzNode
from ._io_types import NynxzFusionInputData
from ._regions import region_pixel_box

# Distinct outline colours cycled per region.
_COLORS = [
    (255, 90, 90),
    (90, 200, 255),
    (140, 255, 120),
    (255, 210, 80),
    (220, 130, 255),
    (255, 150, 200),
]


def _to_pil(image: torch.Tensor) -> Image.Image:
    """[1,H,W,C] or [H,W,C] float image -> RGB PIL."""
    arr = image
    if arr.ndim == 4:
        arr = arr[0]
    arr = (arr[:, :, :3].clamp(0, 1).cpu().numpy() * 255.0).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def _draw(image: torch.Tensor, regions, dim_if_empty=True) -> Image.Image:
    pil = _to_pil(image)
    if not regions:
        if dim_if_empty:
            pil = Image.blend(pil, Image.new("RGB", pil.size, (0, 0, 0)), 0.55)
        return pil
    draw = ImageDraw.Draw(pil)
    width, height = pil.size
    line = max(2, round(min(width, height) * 0.006))
    for i, region in enumerate(regions):
        if not isinstance(region, dict) or region.get("enabled") is False:
            continue
        left, top, right, bottom = region_pixel_box(region, width, height)
        if right <= left or bottom <= top:
            continue
        color = _COLORS[i % len(_COLORS)]
        draw.rectangle((left, top, right, bottom), outline=color, width=line)
        label = str(region.get("label") or f"r{i}")
        draw.text((left + line + 1, top + line + 1), label, fill=color)
    return pil


def _to_tensor(pil: Image.Image) -> torch.Tensor:
    """RGB PIL -> a single-image [1, H, W, 3] float tensor, keeping its own size."""
    arr = np.asarray(pil).astype(np.float32) / 255.0
    return torch.from_numpy(arr)[None, ...]


class FusionRegionsPreview(NynxzNode):
    CATEGORY = "Nynxz/Fusion"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="FusionRegionsPreview",
            display_name="Fusion Regions Preview",
            description="Draws each fusion source's regions (boxes + labels) onto it so you can see "
            "what a grounding/region node selected. Wire a fusion_input in and a Preview Image on "
            "the output. Sources with no region are dimmed (they blend as a full-frame background).",
            inputs=[NynxzFusionInputData.Input("fusion_input")],
            outputs=[io.Image.Output(display_name="preview", is_output_list=True)],
        )

    @classmethod
    def execute(cls, fusion_input) -> io.NodeOutput:
        entries = list(fusion_input or [])
        frames = [
            _to_tensor(_draw(entry["image"], entry.get("regions")))
            for entry in entries
            if "image" in entry
        ]
        # A list output (is_output_list) keeps every source at its own size — Preview Image
        # renders one per source, instead of padding them all onto a shared black canvas.
        if not frames:
            frames = [torch.zeros((1, 64, 64, 3), dtype=torch.float32)]
        return io.NodeOutput(frames)
