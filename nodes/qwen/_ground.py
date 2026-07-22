"""Grounding-output parsing — turn a Qwen3-VL grounding reply into fusion regions. Pure, testable.

The grounding node prompts Qwen3-VL to locate a phrase and return boxes; this module turns that free
text into the normalised region dicts the fusion engine consumes (`{x,y,w,h,shape,feather,strength}`,
0..1, top-left origin — see `nodes/fusion/_regions.py`).

The one real unknown is which coordinate convention the model emits — normalised 0..1, a 0..1000 grid,
or raw pixels of the processed image. Rather than bet on one, `normalise_bbox` sniffs the magnitude
and the node also surfaces the raw reply, so the first live run settles it. Everything here is pure
(coordinates in, regions out), so it's unit-tested without a model.
"""

from __future__ import annotations

import json
import re

# Four numbers in a bracket: `[x1, y1, x2, y2]` (ints or floats, optional signs/decimals).
_BBOX_RE = re.compile(
    r"\[\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,"
    r"\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\]"
)


def grounding_prompt(phrase: str) -> str:
    """Ask for boxes in a parseable, resolution-independent form (0..1000 grid)."""
    phrase = phrase.strip() or "the main subject"
    return (
        f"Locate {phrase} in the image. Respond with ONLY a JSON array; each element is "
        '{"label": "<name>", "bbox_2d": [x1, y1, x2, y2]} with integer coordinates on a 0-1000 '
        "grid (top-left = 0,0; bottom-right = 1000,1000). Return every distinct instance. "
        f"If {phrase} is not present, respond with []."
    )


def extract_bboxes(text: str) -> list[list[float]]:
    """Pull `[x1,y1,x2,y2]` boxes out of a model reply, JSON first then a regex fallback."""
    # Preferred: a JSON array of objects with bbox_2d.
    start, end = text.find("["), text.rfind("]")
    if 0 <= start < end:
        try:
            data = json.loads(text[start : end + 1])
            boxes = [
                item["bbox_2d"]
                for item in data
                if isinstance(item, dict) and isinstance(item.get("bbox_2d"), list)
            ]
            if boxes:
                return [[float(v) for v in b[:4]] for b in boxes if len(b) >= 4]
        except (json.JSONDecodeError, TypeError, ValueError):
            pass
    # Fallback: any 4-number bracket anywhere in the text (handles chatty / malformed replies).
    return [[float(v) for v in m] for m in _BBOX_RE.findall(text)]


def normalise_bbox(bbox, proc_w: int, proc_h: int):
    """Map a raw box to a normalised (x, y, w, h) in [0,1], sniffing the coordinate convention.

    <= 1: already normalised. <= 1000: a 0..1000 grid (what the prompt asks for). Otherwise raw
    pixels of the processed image, divided by its dims. Returns None for a degenerate box.
    """
    x1, y1, x2, y2 = bbox
    peak = max(abs(x1), abs(y1), abs(x2), abs(y2))
    if peak <= 1.0:
        sx = sy = 1.0
    elif peak <= 1000.0:
        sx = sy = 1000.0
    else:
        sx, sy = float(max(proc_w, 1)), float(max(proc_h, 1))
    x1, x2 = sorted((x1 / sx, x2 / sx))
    y1, y2 = sorted((y1 / sy, y2 / sy))
    x1, y1, x2, y2 = (min(max(v, 0.0), 1.0) for v in (x1, y1, x2, y2))
    if x2 - x1 <= 0.0 or y2 - y1 <= 0.0:
        return None
    return x1, y1, x2 - x1, y2 - y1


def reply_to_regions(
    text, proc_w, proc_h, shape="rect", feather=0.0, strength=1.0, label=""
) -> list[dict]:
    """Full pipeline: a grounding reply -> a list of region dicts for one source (may be empty).

    `label` (e.g. the grounded phrase) rides along for the preview overlay; the fusion engine
    ignores keys it doesn't read, so it's harmless to the blend.
    """
    regions = []
    for bbox in extract_bboxes(text):
        norm = normalise_bbox(bbox, proc_w, proc_h)
        if norm is None:
            continue
        x, y, w, h = norm
        regions.append(
            {
                "x": x,
                "y": y,
                "w": w,
                "h": h,
                "shape": shape,
                "feather": feather,
                "strength": strength,
                "label": label,
            }
        )
    return regions
