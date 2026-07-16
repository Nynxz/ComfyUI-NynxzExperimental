"""Fusion Reference — build a fusion_input from an ordinary IMAGE socket.

The Fusion Input grid is the nice way to collect references, but it only reaches files on
disk: anything generated upstream has to be sent through a Preview or Save node first and
picked back out of temp/. This node is the plain-wire alternative — a Load Image (or any
IMAGE, including one straight out of a sampler) plus a strength, chained into the same
`fusion_input` the grid produces.

Chain them for several references, and mix freely with a Fusion Input grid on either end:

    Load Image ─→ Fusion Reference ─→ Fusion Reference ─→ Text Encode ... (Fusion)
                        ↑ image             ↑ image

Order is chain order — upstream references come first, matching how Fusion Input chains — and
the spatial patterns assign grid cells by source index, so it decides which cells each image
gets. A batched IMAGE contributes one source per frame, in batch order.
"""

from __future__ import annotations

import torch

from comfy_api.latest import io

from .._base import NynxzNode
from ._fusion import REFERENCE_FIT
from ._io_types import NynxzFusionInputData


class FusionReference(NynxzNode):
    CATEGORY = "Nynxz/Fusion"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="FusionReference",
            display_name="Fusion Reference",
            description="Add an IMAGE to a fusion_input with a strength. Chain these to fuse "
                        "regular Load Image nodes without going through the Fusion Input grid.",
            inputs=[
                io.Image.Input("image", tooltip="Any IMAGE. A batch adds one reference per frame."),
                io.Float.Input(
                    "strength", default=1.0, min=0.0, max=10.0, step=0.05,
                    tooltip="Relative prevalence in the blend, not an absolute gain — doubling every "
                            "reference changes nothing. 0 mutes this one. Matches the grid's strength.",
                ),
                NynxzFusionInputData.Input(
                    "fusion_input", optional=True,
                    tooltip="Optional upstream Fusion Reference or Fusion Input — its images come "
                            "first, then this node's.",
                ),
            ],
            outputs=[NynxzFusionInputData.Output(display_name="fusion_input")],
        )

    @classmethod
    def execute(cls, image, strength=1.0, fusion_input=None) -> io.NodeOutput:
        # Never mutate the upstream list: ComfyUI hands the same object to every consumer, so
        # appending in place would make a fan-out silently accumulate references.
        sources: list[dict] = list(fusion_input or [])

        frames = image if isinstance(image, torch.Tensor) else None
        if frames is None:
            raise ValueError("Fusion Reference needs an IMAGE tensor.")
        if frames.ndim == 3:
            frames = frames.unsqueeze(0)

        weight = max(0.0, float(strength))
        for i in range(frames.shape[0]):
            sources.append({
                "image": frames[i:i + 1].clone(),
                "strength": weight,
                "fit": REFERENCE_FIT,
                "label": f"reference {len(sources) + 1}",
            })
        return io.NodeOutput(sources)
