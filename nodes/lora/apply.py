"""Nynxz Apply LoRA (V3) — applies a stack from a Nynxz LoRA Picker to MODEL + CLIP."""

from __future__ import annotations

from comfy_api.latest import io

from .._base import NynxzNode
from .io_types import NynxzLoraStackData
from .stack import apply_lora_stack


class NynxzLoraApply(NynxzNode):
    CATEGORY = "Nynxz/LoRA"

    @classmethod
    def define_schema(cls) -> io.Schema:
        return cls.make_schema(
            node_id="NynxzLoraApply",
            display_name="Apply LoRA",
            description="Applies a LoRA stack (from a LoRA Picker) to MODEL + CLIP.",
            inputs=[
                io.Model.Input("model"),
                io.Clip.Input("clip"),
                NynxzLoraStackData.Input("lora_stack", tooltip="Connect a Nynxz LoRA Picker"),
            ],
            outputs=[
                io.Model.Output(display_name="model"),
                io.Clip.Output(display_name="clip"),
            ],
        )

    @classmethod
    def execute(cls, model, clip, lora_stack=None) -> io.NodeOutput:
        model, clip = apply_lora_stack(model, clip, lora_stack)
        return io.NodeOutput(model, clip)
