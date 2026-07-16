"""Custom IO types for the fusion pack (V3).

Two types, mirroring the widget/wire split:

  * NYNXZ_FUSION_GRID  — an on-node WIDGET (socketless) rendered by the Vue grid
    (src/fusion/FusionGrid.vue). Its value is the row list the user arranges:
    `{id, src, ref, type, slot, on, strength, fit}` per image. It serializes with
    the graph, so a workflow reopens with its images, strengths and mutes intact.

  * NYNXZ_FUSION_INPUT — a plain WIRE type carrying the resolved sources from the
    Fusion Input node to a fusion node. No frontend widget is registered for it, so
    it renders as an ordinary socket. Its value is a list of
    `{image, strength, fit, label}` — see `fusion_input.py`.
"""

from __future__ import annotations

from comfy_api.latest import io

from .._base import widget_input


@io.comfytype(io_type="NYNXZ_FUSION_GRID")
class NynxzFusionGridType:
    """On-node fusion grid WIDGET value (socketless): the list of image rows."""

    Type = list
    Input = widget_input()


# Wire/socket type carrying resolved fusion sources (Fusion Input → Fusion encode).
NynxzFusionInputData = io.Custom("NYNXZ_FUSION_INPUT")
