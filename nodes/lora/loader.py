"""Nynxz LoRA Loader (V3) — the default multi-LoRA stack loader: MODEL in, the on-node
stack widget, MODEL out. No CLIP (the common case nowadays). Use "LoRA Loader (CLIP)" (see
loader_clip.py) when you also want to patch CLIP. Mirrors ComfyUI's stock LoraLoaderModelOnly.
For a reusable selector, use the Nynxz LoRA Picker → Nynxz Apply LoRA pair instead."""

from __future__ import annotations

from comfy_api.latest import io

from .._base import NynxzNode
from .io_types import NynxzLoraStackType
from .stack import apply_lora_stack


class NynxzLoraLoader(NynxzNode):
    CATEGORY = "Nynxz/LoRA"

    @classmethod
    def define_schema(cls) -> io.Schema:
        return cls.make_schema(
            node_id="NynxzLoraLoader",
            display_name="LoRA Loader",
            description="Applies a stack of LoRAs to MODEL only (no CLIP) — the common case. Build the stack on the node — each row has an on/off toggle, a searchable/bookmarkable picker, and a strength. Use 'LoRA Loader (CLIP)' if you also need to patch CLIP.",
            inputs=[
                io.Model.Input("model"),
                NynxzLoraStackType.Input(
                    "stack", tooltip="LoRA stack — add rows, pick + bookmark on the node"
                ),
            ],
            outputs=[
                io.Model.Output(display_name="model"),
            ],
        )

    @classmethod
    def execute(cls, model, stack=None) -> io.NodeOutput:
        # clip=None → load_lora_for_models patches MODEL only (clip strength ignored).
        model, _ = apply_lora_stack(model, None, stack)
        return io.NodeOutput(model)
