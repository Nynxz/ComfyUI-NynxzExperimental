"""Krea Qwen3-VL Layer Bands - probe the 12-layer stack in four bands to find where effects live.

The ramp (Layer Weight) is coarse. This splits Krea 2's 12 Qwen3-VL taps into four bands of three
and scales each independently, so you can hunt down which layers actually carry structure vs
texture vs semantics:

  * low   - layers 0-2  (taps 2,5,8)    : lowest-level texture / colour
  * mid_lo- layers 3-5  (taps 11,14,17)
  * mid_hi- layers 6-8  (taps 20,23,26)
  * high  - layers 9-11 (taps 29,32,35) : semantics / concept

Turn one band up and the rest to ~1 to isolate what it contributes. A plain conditioning transform,
no model patching. Krea 2 only (keys off the 12x2560 width). Experimental; no-op at all 1.0.
"""

from __future__ import annotations

import torch
from comfy_api.latest import io

from .._base import NynxzNode

_TXTLAYERS = 12
_TXTDIM = 2560
_FUSED = _TXTLAYERS * _TXTDIM


class KreaQwenLayerBands(NynxzNode):
    CATEGORY = "Nynxz/Experimental"

    @classmethod
    def define_schema(cls):
        band = {"default": 1.0, "min": 0.0, "max": 3.0, "step": 0.05}
        return cls.make_schema(
            node_id="KreaQwenLayerBands",
            display_name="Krea Qwen3-VL Layer Bands",
            description="Scale the Qwen3-VL conditioning stack in four layer bands "
            "(low / mid_lo / mid_hi / high) to find which layers carry which effect. Plain "
            "conditioning transform, Krea 2 only. Experimental.",
            is_experimental=True,
            inputs=[
                io.Conditioning.Input("conditioning"),
                io.Float.Input("low", tooltip="Layers 0-2: lowest-level texture / colour.", **band),
                io.Float.Input("mid_lo", tooltip="Layers 3-5.", **band),
                io.Float.Input("mid_hi", tooltip="Layers 6-8.", **band),
                io.Float.Input("high", tooltip="Layers 9-11: semantics / concept.", **band),
            ],
            outputs=[io.Conditioning.Output()],
        )

    @classmethod
    def execute(cls, conditioning, low=1.0, mid_lo=1.0, mid_hi=1.0, high=1.0) -> io.NodeOutput:
        bands = [float(low), float(mid_lo), float(mid_hi), float(high)]
        if all(b == 1.0 for b in bands):
            return io.NodeOutput(conditioning)

        # One scale per layer: each band of 3 shares its value.
        per_layer = [bands[i // 3] for i in range(_TXTLAYERS)]

        out = []
        for entry in conditioning:
            tensor, meta = entry[0], entry[1]
            if tensor.ndim == 3 and tensor.shape[-1] == _FUSED:
                b, seq, _ = tensor.shape
                scale = torch.tensor(per_layer, device=tensor.device, dtype=tensor.dtype)
                layered = tensor.reshape(b, seq, _TXTLAYERS, _TXTDIM) * scale[None, None, :, None]
                tensor = layered.reshape(b, seq, _FUSED)
            out.append([tensor, meta.copy() if isinstance(meta, dict) else meta])
        return io.NodeOutput(out)
