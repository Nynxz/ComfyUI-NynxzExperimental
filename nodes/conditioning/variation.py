"""Conditioning Variation — seeded 'variation seed' for conditioning.

Perturbs a conditioning with seeded noise so you can explore neighbouring variations of the same
prompt without changing the sampler seed. Keep magnitude to nudge only the content (coherent
variety); turn it off for a rawer perturbation. Drop it on any CONDITIONING wire — e.g. vary a
prompt before gating it or sampling with it.
"""

from __future__ import annotations

from comfy_api.latest import io

from .._base import NynxzNode
from ._variation import vary_conditioning


class ConditioningVariation(NynxzNode):
    CATEGORY = "Nynxz/Conditioning"

    @classmethod
    def define_schema(cls) -> io.Schema:
        return cls.make_schema(
            node_id="ConditioningVariation",
            display_name="Conditioning Variation",
            description="Nudges a conditioning with seeded noise for prompt variations that don't "
            "touch the sampler seed. Noise scales to each token's magnitude, so strength is "
            "consistent across prompts; 'preserve magnitude' keeps activation energy so the "
            "variation changes content, not loudness.",
            inputs=[
                io.Conditioning.Input("conditioning"),
                io.Float.Input(
                    "strength",
                    default=0.1,
                    min=0.0,
                    max=2.0,
                    step=0.01,
                    tooltip="How far to nudge. 0 = unchanged; ~0.1 gives close variations; higher "
                    "drifts further from the prompt.",
                ),
                io.Int.Input(
                    "seed",
                    default=0,
                    min=0,
                    max=0xFFFFFFFFFFFFFFFF,
                    control_after_generate=True,
                    tooltip="Variation seed — change it to get a different variation.",
                ),
                io.Boolean.Input(
                    "preserve_magnitude",
                    default=True,
                    tooltip="Rescale each token back to its original magnitude so the nudge "
                    "changes direction (content), not activation energy.",
                ),
            ],
            outputs=[io.Conditioning.Output(display_name="conditioning")],
            is_experimental=True,
        )

    @classmethod
    def execute(cls, conditioning, strength, seed, preserve_magnitude=True) -> io.NodeOutput:
        if not conditioning:
            raise ValueError("Conditioning Variation needs a conditioning wired in.")
        return io.NodeOutput(
            vary_conditioning(conditioning, float(strength), int(seed), bool(preserve_magnitude))
        )
