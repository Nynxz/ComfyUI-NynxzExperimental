"""Qwen3-VL Ground — locate a phrase in each fusion image and attach it as a fusion region.

The bridge from the LLM to the semantic fusion field. For each image on a Fusion Input, it asks
Qwen3-VL (native inference) where a phrase is ("the sky", "her face", ...), parses the boxes into
normalised regions, and rides them along on the `fusion_input` entry as `entry["regions"]`. Wire the
output into the Fusion encode and raise `region_strength` — the encode then composes the edit from
the parts the model actually found, instead of a blind geometric pattern.

Phrases map to images in order, one per line; blank / missing lines leave that image ungrounded (it
stays a full-frame background layer in the blend). The `debug` output is the model's raw replies, so
you can see exactly what it emitted.
"""

from comfy_api.latest import io

from .._base import NynxzNode
from ..fusion._fusion import qwen2vl_image_size
from ..fusion._io_types import NynxzFusionInputData
from ._generate import run_generate
from ._ground import grounding_prompt, reply_to_regions


class Qwen3VLGround(NynxzNode):
    CATEGORY = "Nynxz/Qwen3-VL"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="Qwen3VLGround",
            display_name="Qwen3-VL Ground",
            description="Grounds a phrase per image (native Qwen3-VL inference) and attaches the "
            "boxes as regions on fusion_input, so the Fusion encode can compose the edit from named "
            "parts. Phrases map to images in order, one per line.",
            inputs=[
                io.Clip.Input(
                    "clip", tooltip="The same Qwen3-VL text encoder the Fusion encode uses."
                ),
                NynxzFusionInputData.Input("fusion_input"),
                io.String.Input(
                    "phrases",
                    multiline=True,
                    default="the main subject",
                    tooltip="What to take from each image, one per line, in image order. A blank or "
                    "missing line leaves that image ungrounded (full-frame background in the blend).",
                ),
                io.Combo.Input(
                    "shape",
                    options=["rect", "ellipse"],
                    default="rect",
                    advanced=True,
                    tooltip="Region shape rasterised from each box.",
                ),
                io.Float.Input(
                    "feather",
                    default=0.1,
                    min=0.0,
                    max=0.5,
                    step=0.01,
                    advanced=True,
                    tooltip="Soft edge on each region (normalised units), so grounded areas blend "
                    "rather than hard-cut.",
                ),
                io.Float.Input(
                    "strength",
                    default=2.0,
                    min=0.0,
                    max=8.0,
                    step=0.1,
                    advanced=True,
                    tooltip="How hard a grounded region claims its area vs a full-frame source. 1 = "
                    "equal footing; above 1 makes the grounded image dominate where it was found.",
                ),
                io.Int.Input(
                    "max_tokens",
                    default=256,
                    min=16,
                    max=2048,
                    advanced=True,
                    tooltip="Token budget per image for the grounding reply.",
                ),
                io.Int.Input(
                    "seed",
                    default=0,
                    min=0,
                    max=0xFFFFFFFFFFFFFFFF,
                    control_after_generate=True,
                    advanced=True,
                ),
            ],
            outputs=[
                NynxzFusionInputData.Output(display_name="fusion_input"),
                io.String.Output(display_name="debug"),
            ],
        )

    @classmethod
    def execute(
        cls,
        clip,
        fusion_input,
        phrases="the main subject",
        shape="rect",
        feather=0.1,
        strength=2.0,
        max_tokens=256,
        seed=0,
    ) -> io.NodeOutput:
        entries = list(fusion_input or [])
        lines = [line.strip() for line in (phrases or "").splitlines()]

        out_entries = []
        debug = []
        for i, entry in enumerate(entries):
            phrase = lines[i] if i < len(lines) else ""
            if not phrase:
                out_entries.append(entry)  # ungrounded — passes through, stays full-frame
                continue

            image = entry["image"]
            proc_h, proc_w = qwen2vl_image_size(
                image.shape[1], image.shape[2], patch_size=16, merge_size=2
            )
            reply = run_generate(
                clip,
                prompt=grounding_prompt(phrase),
                image=image,
                system="You are a precise visual grounding assistant.",
                max_tokens=max_tokens,
                do_sample=False,  # grounding wants determinism
                seed=seed,
            )
            regions = reply_to_regions(
                reply, proc_w, proc_h, shape, feather, strength, label=phrase
            )
            debug.append(f"[{i}] {phrase!r} -> {len(regions)} region(s)\n{reply}")
            out_entries.append({**entry, "regions": regions})

        return io.NodeOutput(out_entries, "\n\n".join(debug))
