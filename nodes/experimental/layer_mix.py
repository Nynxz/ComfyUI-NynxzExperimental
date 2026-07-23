"""Krea Layer Mix - style transfer by splicing two conditionings across the Qwen3-VL layer stack.

Krea 2's conditioning is a 12-layer Qwen3-VL stack where early layers carry low-level look
(texture, colour) and late layers carry semantics (what the thing is). This takes two conditionings
and splices them by layer: the early (style) layers come from `style`, the late (content) layers
from `content`. The result renders `content`'s subject in `style`'s look - style transfer done
entirely in the layer stack, no attention or model patching.

The one requirement: both conditionings must share the same token length, which holds when they
come from the *same fusion structure* (same prompt + source count, different references / images).
Feed two fusion encodes in and it splices cleanly. Krea-2-specific (keys off the 12x2560 width);
raises if the two don't match. Experimental; a plain conditioning transform.
"""

from __future__ import annotations

from comfy_api.latest import io

from .._base import NynxzNode

_TXTLAYERS = 12
_TXTDIM = 2560
_FUSED = _TXTLAYERS * _TXTDIM  # 30720


class KreaLayerMix(NynxzNode):
    CATEGORY = "Nynxz/Experimental"

    @classmethod
    def define_schema(cls):
        return cls.make_schema(
            node_id="KreaLayerMix",
            display_name="Krea Layer Mix (style / content splice)",
            description="Splice two Krea 2 conditionings across the Qwen3-VL layer stack: early "
            "(style) layers from `style`, late (content) layers from `content` - so you get "
            "`content`'s subject in `style`'s look. Both must share token length (same fusion "
            "structure). Krea 2 only. Experimental.",
            is_experimental=True,
            inputs=[
                io.Conditioning.Input(
                    "content",
                    tooltip="Drives the subject / semantics (its late layers are kept).",
                ),
                io.Conditioning.Input(
                    "style",
                    tooltip="Drives the look / texture (its early layers are kept). Must match "
                    "`content`'s token length - use the same fusion structure.",
                ),
                io.Int.Input(
                    "split_layer",
                    default=6,
                    min=0,
                    max=_TXTLAYERS,
                    step=1,
                    tooltip="Layer boundary (0-12). Layers below it take style, at/above take "
                    "content. Lower = less style transferred; higher = more of the style's "
                    "structure comes through too.",
                ),
            ],
            outputs=[io.Conditioning.Output()],
        )

    @classmethod
    def execute(cls, content, style, split_layer=6) -> io.NodeOutput:
        split = max(0, min(_TXTLAYERS, int(split_layer)))
        if split == 0:
            return io.NodeOutput(content)

        out = []
        for content_entry, style_entry in zip(content, style, strict=False):
            c_tensor, c_meta = content_entry[0], content_entry[1]
            s_tensor = style_entry[0]
            ok = (
                c_tensor.ndim == 3
                and c_tensor.shape[-1] == _FUSED
                and s_tensor.shape == c_tensor.shape
            )
            if ok:
                b, seq, _ = c_tensor.shape
                content_l = c_tensor.reshape(b, seq, _TXTLAYERS, _TXTDIM).clone()
                style_l = s_tensor.reshape(b, seq, _TXTLAYERS, _TXTDIM)
                # early layers (< split) = style; late layers (>= split) = content.
                content_l[:, :, :split, :] = style_l[:, :, :split, :].to(content_l.dtype)
                tensor = content_l.reshape(b, seq, _FUSED)
            elif c_tensor.ndim == 3 and c_tensor.shape[-1] == _FUSED:
                raise ValueError(
                    "Krea Layer Mix needs `content` and `style` to have the same token length "
                    f"(got {tuple(c_tensor.shape)} vs {tuple(s_tensor.shape)}). Encode both from "
                    "the same fusion structure — same prompt and source count."
                )
            else:
                tensor = c_tensor  # not a Krea 2 conditioning; pass content through
            out.append([tensor, c_meta.copy() if isinstance(c_meta, dict) else c_meta])
        return io.NodeOutput(out)
