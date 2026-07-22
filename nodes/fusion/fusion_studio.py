"""Fusion Studio — arrange images as layers on a canvas, and use that layout to drive fusion.

An interactive stage (src/fusion/FusionStage.vue): drop images, place/scale each as a layer,
set its opacity, blend mode, fit and z-order. The node then does two things at once:

  * **Composites** the layers back-to-front into one IMAGE (+ union MASK) — a real scene.
  * **Emits a fusion_input** whose shape depends on `fuse_as` (a toggle on the stage):
      - "layers"    — one source per layer, each carrying its canvas box as a *region*, plus
                      the background as a region-less fill. Sent with fit="stretch" so
                      `region_to_grid` (_regions.py) is the identity and every region lands
                      exactly where its pixels did — the spatial fusion mirrors the layout.
                      NB regions only bite when the encode node's Region Strength > 0.
      - "flattened" — the composite as a single source (no regions needed).
      - "off"       — pass the upstream fusion_input straight through.

The same placement routine (`_composite.place_layer`) feeds both the composite and the fusion
sources, so what you arrange is what you get in the blend.

Cutout is dependency-free: a layer composites on the image's OWN alpha, so a cut-out PNG (RGBA)
drops in already masked — remove backgrounds with whatever tool you like, save transparent, and
add it. Turn a layer's cutout off to place the full rectangle even when the file has alpha.
"""

from __future__ import annotations

import os

import folder_paths
import numpy as np
import torch
from comfy_api.latest import io
from PIL import Image, ImageOps

from .._base import NynxzNode
from . import _composite as C
from ._io_types import NynxzFusionInputData, NynxzFusionStageType

try:
    import node_helpers
except ImportError:  # pragma: no cover - outside ComfyUI
    node_helpers = None

FOLDER_TYPES = ("input", "temp", "output")


def _pillow(fn, *args):
    return node_helpers.pillow(fn, *args) if node_helpers else fn(*args)


def _resolve_path(ref: str, folder_type: str = "input") -> str | None:
    """Map a layer's ref to a real path, keeping ComfyUI's traversal guard in play."""
    if not ref:
        return None
    annotated = f"{ref} [{folder_type}]" if folder_type in FOLDER_TYPES else str(ref)
    try:
        path = folder_paths.get_annotated_filepath(annotated)
    except Exception:  # noqa: BLE001 - rejected/malformed ref
        return None
    return path if path and os.path.isfile(path) else None


def _load_rgba(path: str) -> torch.Tensor | None:
    """Load a file as a single [H, W, 4] RGBA source (first frame, EXIF-corrected).

    Alpha is kept so a cut-out PNG composites transparently without a matte pass; a flat
    image comes back fully opaque.
    """
    try:
        img = _pillow(Image.open, path)
        img = _pillow(ImageOps.exif_transpose, img)
        arr = np.array(img.convert("RGBA")).astype(np.float32) / 255.0
        return torch.from_numpy(arr)
    except Exception as exc:  # noqa: BLE001 - unreadable image, skip the layer
        print(f"[Nynxz] fusion studio could not read {path}: {exc}")
        return None


def _stamp(ref: str, folder_type: str) -> str:
    path = _resolve_path(ref, folder_type)
    if not path:
        return f"{ref}:missing"
    try:
        stat = os.stat(path)
        return f"{ref}:{stat.st_mtime_ns}:{stat.st_size}"
    except OSError:
        return f"{ref}:missing"


def _background_frame(stage: dict) -> torch.Tensor:
    """The canvas-sized background: a solid colour, with an optional image covered over it."""
    canvas = stage["canvas"]
    cw, ch = canvas["width"], canvas["height"]
    bg = stage["background"]
    r, g, b = C.hex_to_rgb(bg["color"])
    frame = torch.empty((ch, cw, 3), dtype=torch.float32)
    frame[..., 0], frame[..., 1], frame[..., 2] = r, g, b

    path = _resolve_path(bg["ref"], bg["type"])
    if path:
        img = _load_rgba(path)
        if img is not None:
            rgb, alpha = C.fit_into(img, cw, ch, "cover")
            a = alpha.unsqueeze(-1)
            frame = frame * (1.0 - a) + rgb * a
    return frame


def _background_is_meaningful(stage: dict) -> bool:
    """Whether the background should ride along as a fusion fill source (owns the area outside
    every layer box). A bare black canvas isn't worth injecting as an image token."""
    bg = stage["background"]
    return bool(_resolve_path(bg["ref"], bg["type"])) or bg["color"].lower() not in (
        "#000000",
        "#000",
    )


class FusionStudio(NynxzNode):
    CATEGORY = "Nynxz/Fusion"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="FusionStudio",
            display_name="Fusion Studio",
            description="Arrange images as layers on a canvas, then composite them AND use the "
            "layout as a fusion input — each layer's box becomes a spatial region. Outputs the "
            "composite image, its mask, and a fusion_input for a fusion encode node.",
            is_experimental=True,
            inputs=[
                NynxzFusionStageType.Input("stage", default={}),
                NynxzFusionInputData.Input(
                    "fusion_input",
                    optional=True,
                    tooltip="Optional upstream Fusion Input — its sources come first, then this "
                    "stage's layers.",
                ),
            ],
            outputs=[
                io.Image.Output(display_name="image", tooltip="The flattened composite."),
                io.Mask.Output(display_name="mask", tooltip="Union of all layer alphas."),
                NynxzFusionInputData.Output(
                    display_name="fusion_input",
                    tooltip="Sources for a fusion encode node. Shape set by the stage's 'Fuse as' "
                    "toggle. For 'layers', raise Region Strength on the encode node to make the "
                    "layout drive the blend.",
                ),
            ],
        )

    @classmethod
    def fingerprint_inputs(cls, stage=None, fusion_input=None):
        """Re-run when a referenced file changes on disk, not just when the layout does."""
        s = C.normalize_stage(stage)
        stamps = [_stamp(s["background"]["ref"], s["background"]["type"])]
        stamps += [_stamp(layer["ref"], layer["type"]) for layer in s["layers"]]
        return "|".join(stamps)

    @classmethod
    def execute(cls, stage, fusion_input=None) -> io.NodeOutput:
        s = C.normalize_stage(stage)
        canvas = s["canvas"]
        cw, ch = canvas["width"], canvas["height"]

        background = _background_frame(s)

        # Place every enabled layer once — the frame feeds both the composite and the fusion
        # source, so the two can't disagree.
        placed: list[dict] = []
        for layer in s["layers"]:
            if not layer["on"]:
                continue
            path = _resolve_path(layer["ref"], layer["type"])
            if not path:
                print(f"[Nynxz] fusion studio skipping missing image: {layer['ref']}")
                continue
            src = _load_rgba(path)
            if src is None:
                continue
            # Cutout = the image's own transparency. A cut-out PNG (RGBA) composites on its alpha;
            # turning a layer's cutout off forces the full rectangle even if the file has alpha.
            if not layer["matte"]:
                src = src.clone()
                src[..., 3] = 1.0
            if layer["flip_h"]:
                src = torch.flip(src, dims=[1])  # mirror across the vertical axis (W)
            if layer["flip_v"]:
                src = torch.flip(src, dims=[0])  # mirror across the horizontal axis (H)
            box = {"x": layer["x"], "y": layer["y"], "w": layer["w"], "h": layer["h"]}
            frame, alpha = C.place_layer(src, cw, ch, box, layer["fit"], layer["feather"])
            placed.append({"layer": layer, "frame": frame, "alpha": alpha, "box": box})

        # Composite (back-to-front == list order == z-order).
        comp_image, comp_mask = C.composite(
            background,
            [(p["frame"], p["alpha"], p["layer"]["opacity"], p["layer"]["blend"]) for p in placed],
        )

        fusion_out = cls._build_fusion(s, background, placed, comp_image, fusion_input)
        return io.NodeOutput(comp_image, comp_mask, fusion_out)

    @classmethod
    def _build_fusion(cls, s, background, placed, comp_image, upstream) -> list[dict]:
        # Copy the upstream list — ComfyUI hands the same object to every consumer, so appending
        # in place would make a fan-out silently accumulate sources.
        sources: list[dict] = list(upstream or [])
        mode = s["fuse_as"]

        if mode == "off":
            return sources

        if mode == "flattened":
            sources.append(
                {"image": comp_image, "strength": 1.0, "fit": "contain", "label": "stage"}
            )
            return sources

        # "layers": background is a region-less fill (owns everything outside the boxes), then one
        # region-tagged source per layer. fit="stretch" makes region_to_grid the identity.
        if cls._background_meaningful(s):
            sources.append(
                {
                    "image": background.unsqueeze(0),
                    "strength": 1.0,
                    "fit": "stretch",
                    "label": "background",
                }
            )
        for p in placed:
            layer, box = p["layer"], p["box"]
            region = {
                **box,
                "shape": "rect",
                "feather": layer["feather"],
                "strength": 1.0,  # the box fully owns its area; entry strength weights the source
                "enabled": True,
            }
            sources.append(
                {
                    "image": p["frame"].unsqueeze(0),
                    "strength": layer["strength"],
                    "fit": "stretch",
                    "label": layer["label"],
                    "regions": [region],
                }
            )
        return sources

    @staticmethod
    def _background_meaningful(s) -> bool:
        return _background_is_meaningful(s)
