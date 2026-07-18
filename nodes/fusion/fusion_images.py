"""Fusion Images — collect several IMAGE sockets into a fusion_input, no chaining.

The quickest way to fuse a handful of regular Load Image nodes: wire each into an autogrow
socket and this outputs a `fusion_input` for the encode node. It's the multi-socket sibling of
Fusion Reference (one image, chainable) and the Fusion Input grid (files on disk) — pick
whichever matches how your images arrive.

Every socket contributes at equal strength, framed by the shared `fit`. For per-image strength
or fit, use the grid or chain Fusion References instead; for equal-weight convenience, this.
A batched IMAGE contributes one source per frame, and an optional upstream fusion_input is
prepended so this still chains with the other collectors if you want.
"""

from __future__ import annotations

from comfy_api.latest import io

from .._base import NynxzNode
from ._fusion import DEFAULT_FIT, FIT_MODES, flatten_images
from ._io_types import NynxzFusionInputData


class FusionImages(NynxzNode):
    CATEGORY = "Nynxz/Fusion"

    @classmethod
    def define_schema(cls):
        images = io.Autogrow.TemplateNames(
            io.Image.Input("image"),
            names=[f"image_{i}" for i in range(1, 17)],
            min=1,
        )
        return cls.make_schema(
            node_id="FusionImages",
            display_name="Fusion Images",
            description="Collect several IMAGE sockets into a fusion_input — wire Load Image "
            "nodes straight in, no chaining. Feeds a fusion encode node.",
            inputs=[
                io.Autogrow.Input("images", template=images),
                io.Combo.Input(
                    "fit",
                    options=FIT_MODES,
                    default=DEFAULT_FIT,
                    tooltip="How every image is framed into the shared grid. contain = whole image, "
                    "letterboxed; cover = center-crop to fill; stretch = distort. The encode "
                    "node's fit override can still force one mode for all sources.",
                ),
                NynxzFusionInputData.Input(
                    "fusion_input",
                    optional=True,
                    tooltip="Optional upstream Fusion Input / Reference / Images — its images come first.",
                ),
            ],
            outputs=[NynxzFusionInputData.Output(display_name="fusion_input")],
        )

    @classmethod
    def execute(cls, images: io.Autogrow.Type, fit=DEFAULT_FIT, fusion_input=None) -> io.NodeOutput:
        # Copy the upstream list — ComfyUI hands the same object to every consumer, so appending
        # in place would make a fan-out silently accumulate images.
        sources: list[dict] = list(fusion_input or [])
        fit = fit if fit in FIT_MODES else DEFAULT_FIT
        for image in flatten_images(images):
            sources.append(
                {
                    "image": image,
                    "strength": 1.0,
                    "fit": fit,
                    "label": f"image {len(sources) + 1}",
                }
            )
        return io.NodeOutput(sources)
