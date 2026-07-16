"""Text Encode Qwen Image Edit (Fusion) — the Fusion Input consumer.

Same engine as the original visual-fusion node (`_fusion.encode_fusion`), but it takes its
sources from a Fusion Input node instead of its own autogrow sockets. That moves per-image
concerns (strength, fit, mute, order) onto the grid where you can see them, and leaves this
node holding only the prompt and the fusion tuning. Chain Fusion Input nodes together to
group more sources into the one input.

Beyond the original: sources carry a per-image strength (relative prevalence in the blend)
and fit mode, and the visual grid's size/aspect is explicit rather than inherited from
whichever image happened to be first.
"""

from comfy_api.latest import io

from .._base import NynxzNode
from ._fusion import ASPECT_OPTIONS, FusionSettings, encode_fusion, seed_input, tuning_inputs
from ._io_types import NynxzFusionInputData


class QwenFusionEncode(NynxzNode):
    CATEGORY = "Nynxz/Fusion"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="QwenFusionEncode",
            display_name="Text Encode Qwen Image Edit (Fusion)",
            description="Fuses the images from a Fusion Input node into one Qwen3-VL conditioning, "
                        "blending their visual tokens by each image's strength.",
            inputs=[
                io.Clip.Input("clip"),
                io.String.Input("prompt", multiline=True, dynamic_prompts=True),
                NynxzFusionInputData.Input("fusion_input"),
                io.Combo.Input(
                    "visual_aspect", options=ASPECT_OPTIONS, default="auto",
                    tooltip="Aspect of the shared visual grid every source is fitted into. "
                            "'auto' takes it from the first image (what the original node did).",
                ),
                io.Int.Input(
                    "visual_size", default=384, min=128, max=1024, step=32,
                    tooltip="Square-equivalent side length of the visual grid. Higher = more visual "
                            "tokens = finer fusion detail, at more compute. 384 = the original node.",
                ),
                *tuning_inputs(),
                seed_input(),
                io.Vae.Input("vae", optional=True),
            ],
            outputs=[io.Conditioning.Output()],
        )

    @classmethod
    def execute(cls, clip, prompt, fusion_input, visual_aspect="auto",
                visual_size=384, fusion_method="spatial-checkerboard", block_size=2,
                dither_ratio=0.5, blend_strength=0.5, feather=1.0, preserve_norm=True,
                content_mode="none", content_strength=0.0, content_temperature=1.0,
                vae=None, seed=0) -> io.NodeOutput:
        entries = list(fusion_input or [])
        if len(entries) < 2:
            raise ValueError(
                "Visual fusion requires at least two images — add more to the Fusion Input grid "
                f"(got {len(entries)}). Muted rows and missing files don't count."
            )

        settings = FusionSettings(
            fusion_method=fusion_method, block_size=block_size, dither_ratio=dither_ratio,
            blend_strength=blend_strength, feather=feather, preserve_norm=preserve_norm,
            content_mode=content_mode, content_strength=content_strength,
            content_temperature=content_temperature, seed=seed,
            visual_aspect=visual_aspect, visual_size=visual_size,
        )
        conditioning = encode_fusion(
            clip, prompt,
            sources=[entry["image"] for entry in entries],
            settings=settings,
            strengths=[entry.get("strength", 1.0) for entry in entries],
            fits=[entry.get("fit", "contain") for entry in entries],
            vae=vae,
        )
        return io.NodeOutput(conditioning)
