"""Nynxz LoRA Picker (V3) — a headless selector: no MODEL/CLIP, just the on-node stack
widget, outputting the stack on a wire. One picker can feed several Nynxz Apply LoRA nodes."""

from __future__ import annotations

from comfy_api.latest import io

from .._base import NynxzNode
from .io_types import NynxzLoraStackData, NynxzLoraStackType
from .stack import normalize_stack


class NynxzLoraPicker(NynxzNode):
    CATEGORY = "Nynxz/LoRA"

    @classmethod
    def define_schema(cls) -> io.Schema:
        return cls.make_schema(
            node_id="NynxzLoraPicker",
            display_name="LoRA Picker",
            description="Build a LoRA stack (search, thumbnails, bookmarks) and output it on a wire. Feed it into one or more Apply LoRA nodes.",
            inputs=[
                NynxzLoraStackType.Input(
                    "stack", tooltip="LoRA stack — add rows, pick + bookmark on the node"
                ),
            ],
            outputs=[
                NynxzLoraStackData.Output(display_name="lora_stack"),
            ],
        )

    @classmethod
    def execute(cls, stack=None) -> io.NodeOutput:
        return io.NodeOutput(normalize_stack(stack))
