"""Nynxz LoRA Loader (CLIP) (V3) — all-in-one multi-LoRA stack loader (rgthree-style): MODEL +
CLIP in, the on-node stack widget, MODEL + CLIP out. The plain "LoRA Loader" (see loader.py)
is model-only; use this one when you also want to patch CLIP. For a reusable selector, use the
Nynxz LoRA Picker → Nynxz Apply LoRA pair instead."""

from __future__ import annotations

from comfy_api.latest import io

from .._base import NynxzNode
from .io_types import NynxzLoraStackType
from .stack import apply_lora_stack


class NynxzLoraLoaderCLIP(NynxzNode):
    CATEGORY = "Nynxz/LoRA"

    @classmethod
    def define_schema(cls) -> io.Schema:
        return cls.make_schema(
            node_id="NynxzLoraLoaderCLIP",
            display_name="LoRA Loader (CLIP)",
            description="Applies a stack of LoRAs to MODEL + CLIP. Build the stack on the node — each row has an on/off toggle, a searchable/bookmarkable picker, and a strength. Use the plain 'LoRA Loader' if you don't need CLIP.",
            inputs=[
                io.Model.Input("model"),
                io.Clip.Input("clip"),
                NynxzLoraStackType.Input(
                    "stack", tooltip="LoRA stack — add rows, pick + bookmark on the node"
                ),
            ],
            outputs=[
                io.Model.Output(display_name="model"),
                io.Clip.Output(display_name="clip"),
            ],
        )

    @classmethod
    def execute(cls, model, clip, stack=None) -> io.NodeOutput:
        model, clip = apply_lora_stack(model, clip, stack)
        return io.NodeOutput(model, clip)
