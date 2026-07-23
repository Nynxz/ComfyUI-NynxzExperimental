"""Krea Qwen3-VL Layer Weight - rebalance the 12-layer Qwen3-VL stack Krea 2 conditions on.

Krea 2 doesn't condition on a single Qwen3-VL layer - it takes a stack of 12 hidden-state taps
(layers 2, 5, 8, ... 35), kept as (B, seq, 12*2560), and learns to aggregate them. Early taps carry
low-level / textural signal, late taps carry semantics. This node re-weights that stack before it
reaches the model: a linear ramp from `low_level` (the early layers) to `semantic` (the late ones),
so you can bias the conditioning toward concept or toward detail.

It's a plain conditioning-tensor transform - no model patch, no attention surgery, no guidance -
so it's the gentlest lever available and the one most likely to survive on turbo. Krea-2-specific
(keys off the 12x2560 = 30720 feature width); passes any other conditioning through untouched.
Experimental; a no-op at low_level = semantic = 1.0. Reweighting still feeds Krea 2's learned
aggregator, so extreme values can push it out of distribution - stay moderate.
"""

from __future__ import annotations

import torch
from comfy_api.latest import io

from .._base import NynxzNode

_TXTLAYERS = 12
_TXTDIM = 2560
_FUSED = _TXTLAYERS * _TXTDIM  # 30720 - Krea 2's conditioning feature width


class KreaQwenLayerWeight(NynxzNode):
    CATEGORY = "Nynxz/Experimental"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="KreaQwenLayerWeight",
            display_name="Krea Qwen3-VL Layer Weight",
            description="Rebalance the 12-layer Qwen3-VL stack Krea 2 conditions on: ramp from "
            "`low_level` (early layers, texture) to `semantic` (late layers, concept). A plain "
            "conditioning transform - no model patching. Krea 2 only; other conditionings pass "
            "through. Experimental.",
            is_experimental=True,
            inputs=[
                io.Conditioning.Input("conditioning"),
                io.Float.Input(
                    "low_level",
                    default=1.0,
                    min=0.0,
                    max=3.0,
                    step=0.05,
                    tooltip="Weight on the early Qwen3-VL layers (low-level / textural). >1 pushes "
                    "detail and literal features; <1 lets semantics dominate. 1 = unchanged.",
                ),
                io.Float.Input(
                    "semantic",
                    default=1.0,
                    min=0.0,
                    max=3.0,
                    step=0.05,
                    tooltip="Weight on the late Qwen3-VL layers (concept / meaning). >1 pushes "
                    "semantic adherence; the weight ramps linearly from low_level to this. 1 = "
                    "unchanged.",
                ),
            ],
            outputs=[io.Conditioning.Output()],
        )

    @classmethod
    def execute(cls, conditioning, low_level=1.0, semantic=1.0) -> io.NodeOutput:
        low, high = float(low_level), float(semantic)
        if low == 1.0 and high == 1.0:
            return io.NodeOutput(conditioning)

        out = []
        for entry in conditioning:
            tensor, meta = entry[0], entry[1]
            if tensor.ndim == 3 and tensor.shape[-1] == _FUSED:
                b, seq, _ = tensor.shape
                ramp = torch.linspace(
                    low, high, _TXTLAYERS, device=tensor.device, dtype=tensor.dtype
                )
                layered = tensor.reshape(b, seq, _TXTLAYERS, _TXTDIM) * ramp[None, None, :, None]
                tensor = layered.reshape(b, seq, _FUSED)
            out.append([tensor, meta.copy() if isinstance(meta, dict) else meta])
        return io.NodeOutput(out)
