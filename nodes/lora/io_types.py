"""Custom IO types for ComfyUI-Nynxz (V3).

NYNXZ_LORA_STACK renders as an on-node Vue stack widget (see src/components/LoraStack.vue)
instead of the stock combo. Its value is a list of rows: {on, name, strength}; strength
applies to both model + CLIP. An optional `clip` key overrides the CLIP strength.
"""

from __future__ import annotations

from typing import Any

from comfy_api.latest import io


def _make_widget_input(socketless: bool = True):
    """Build a WidgetInput subclass that renders as an on-node widget (no input socket)."""

    class _WidgetInput(io.WidgetInput):
        def __init__(
            self,
            id: str,
            display_name: str | None = None,
            optional: bool = False,
            tooltip: str | None = None,
            advanced: bool | None = None,
            default: Any = None,
        ):
            super().__init__(
                id,
                display_name,
                optional,
                tooltip,
                None,
                default,
                socketless,
                None,
                None,
                None,
                None,
                advanced,
            )

    return _WidgetInput


# io_type strings are namespaced for the experimental pack so they never clash with the
# ComfyUI-NynxzNodes copy when both packs are installed side by side.
@io.comfytype(io_type="NYNXZ_EXP_LORA_STACK")
class NynxzLoraStackType:
    """On-node LoRA stack WIDGET value (socketless): list of {on, name, strength, clip}."""

    Type = list
    Input = _make_widget_input()


# Wire/socket type carrying the same stack list between nodes (Nynxz LoRA Picker → Apply).
# No frontend widget is registered for this io_type, so it renders as a plain socket.
NynxzLoraStackData = io.Custom("NYNXZ_EXP_LORA_STACK_DATA")
