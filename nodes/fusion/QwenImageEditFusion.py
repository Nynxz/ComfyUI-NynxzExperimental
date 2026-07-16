"""The original visual-fusion node: autogrow IMAGE sockets straight into the fusion engine.

Behavior, node id and widget layout are unchanged — the math now lives in `_fusion.py`
(shared with the Fusion Input / Fusion pair), and this node drives it with the defaults
that reproduce what it always did: every source at equal strength, "cover"-fit into a
grid whose aspect comes from the first image.

For managing many images (per-image strength, mute, reorder, fit) use the Fusion Input
node with `nynxz.experimental.QwenFusionEncode` instead.
"""

from comfy_api.latest import io

from .._base import NynxzNode
from ._fusion import FusionSettings, encode_fusion, flatten_images, seed_input, tuning_inputs


class TextEncodeQwenImageEditFusion(NynxzNode):
    CATEGORY = "Nynxz/Qwen Image"

    @classmethod
    def define_schema(cls):
        images = io.Autogrow.TemplateNames(
            io.Image.Input("image"),
            names=[f"image_{i}" for i in range(1, 17)],
            min=2,
        )
        return cls.make_schema(
            node_id="QwenImageEditFusion",
            display_name="Text Encode Qwen Image Edit (Visual Fusion)",
            description="Encodes images separately and spatially blends their Qwen3-VL visual conditioning tokens.",
            inputs=[
                io.Clip.Input("clip"),
                io.String.Input("prompt", multiline=True, dynamic_prompts=True),
                io.Autogrow.Input("images", template=images),
                *tuning_inputs(),
                seed_input(),
                io.Vae.Input("vae", optional=True),
            ],
            outputs=[io.Conditioning.Output()],
        )

    @classmethod
    def execute(cls, clip, prompt, images: io.Autogrow.Type, fusion_method, block_size=2,
                dither_ratio=0.5, blend_strength=0.5, feather=1.0, preserve_norm=True,
                content_mode="none", content_strength=0.0, content_temperature=1.0,
                vae=None, seed=0) -> io.NodeOutput:
        settings = FusionSettings(
            fusion_method=fusion_method, block_size=block_size, dither_ratio=dither_ratio,
            blend_strength=blend_strength, feather=feather, preserve_norm=preserve_norm,
            content_mode=content_mode, content_strength=content_strength,
            content_temperature=content_temperature, seed=seed,
        )
        conditioning = encode_fusion(clip, prompt, flatten_images(images), settings, vae=vae)
        return io.NodeOutput(conditioning)
