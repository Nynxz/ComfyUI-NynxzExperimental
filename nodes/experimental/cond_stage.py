"""Conditioning Handoff — hand from one conditioning to another partway through the denoise.

The eDiff-I idea (an ensemble of denoisers across noise levels), as a node: run `early`
conditioning while the sampler is laying down composition / large structure, then `late`
conditioning once it's resolving detail — structure from one prompt/reference, detail or style
from another. Model-agnostic: it just tags each conditioning with the timestep range it's active
over (ComfyUI's start/end percent), so the sampler swaps at the handoff. No model patching.
"""

from __future__ import annotations

import node_helpers
from comfy_api.latest import io

from .._base import NynxzNode


class ConditioningHandoff(NynxzNode):
    CATEGORY = "Nynxz/Experimental"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="ConditioningHandoff",
            display_name="Conditioning Handoff (stage split)",
            description="Use `early` conditioning for the first part of the denoise (composition / "
            "structure) and `late` for the rest (detail / style), handing over at `handoff`. The "
            "eDiff-I idea — different conditioning at different noise levels — as one node.",
            is_experimental=True,
            inputs=[
                io.Conditioning.Input(
                    "early",
                    tooltip="Active from the start of the denoise — sets composition / large "
                    "structure while the latent is still noisy.",
                ),
                io.Conditioning.Input(
                    "late",
                    tooltip="Active after the handoff — drives detail / style as the image resolves.",
                ),
                io.Float.Input(
                    "handoff",
                    default=0.5,
                    min=0.0,
                    max=1.0,
                    step=0.01,
                    tooltip="Fraction of the denoise to switch at. 0.5 = swap halfway; lower hands "
                    "to `late` sooner (more detail-prompt influence).",
                ),
            ],
            outputs=[io.Conditioning.Output()],
        )

    @classmethod
    def execute(cls, early, late, handoff=0.5) -> io.NodeOutput:
        handoff = max(0.0, min(1.0, float(handoff)))
        # Tag each with the timestep window it's active over, then combine — the sampler runs
        # whichever conditioning's range covers the current step.
        early_ranged = node_helpers.conditioning_set_values(
            early, {"start_percent": 0.0, "end_percent": handoff}
        )
        late_ranged = node_helpers.conditioning_set_values(
            late, {"start_percent": handoff, "end_percent": 1.0}
        )
        return io.NodeOutput(early_ranged + late_ranged)
