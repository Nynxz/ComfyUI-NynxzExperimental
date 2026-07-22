"""Custom IO types for the fusion pack (V3).

Three types, mirroring the widget/wire split:

  * NYNXZ_FUSION_GRID  — an on-node WIDGET (socketless) rendered by the Vue grid
    (src/fusion/FusionGrid.vue). Its value is the row list the user arranges:
    `{id, src, ref, type, slot, on, strength, fit}` per image. It serializes with
    the graph, so a workflow reopens with its images, strengths and mutes intact.

  * NYNXZ_FUSION_INPUT — a plain WIRE type carrying the resolved sources from the
    Fusion Input node to a fusion node. No frontend widget is registered for it, so
    it renders as an ordinary socket. Its value is a list of
    `{image, strength, fit, label}` — see `fusion_input.py`.

  * NYNXZ_FUSION_STAGE — an on-node WIDGET (socketless) rendered by the Vue stage
    canvas (src/fusion/FusionStage.vue) for the Fusion Studio node. Its value is the
    staged layout: `{version, canvas:{width,height}, background:{ref,type,color},
    layers:[{id,ref,type,x,y,w,h,fit,opacity,blend,feather,flip_h,flip_v,matte,on,
    strength,label}], fuse_as}`. It serializes with the graph, so a workflow reopens
    with its layers, placement, blend and mute intact — see `fusion_studio.py`.
"""

from __future__ import annotations

from comfy_api.latest import io

from .._base import widget_input


@io.comfytype(io_type="NYNXZ_FUSION_GRID")
class NynxzFusionGridType:
    """On-node fusion grid WIDGET value (socketless): the list of image rows."""

    Type = list
    Input = widget_input()


@io.comfytype(io_type="NYNXZ_FUSION_STAGE")
class NynxzFusionStageType:
    """On-node staged-composite WIDGET value (socketless): canvas + layers + fuse_as."""

    Type = dict
    Input = widget_input()


@io.comfytype(io_type="NYNXZ_INSPECTOR")
class NynxzInspectorType:
    """Display-only WIDGET (socketless) for the Fusion Inspector: fed the blend payload from
    the node's `ui` output each run (serialize=false on the frontend). The backend ignores its
    value — it exists so ComfyUI renders the Vue widget."""

    Type = dict
    Input = widget_input()


# Wire/socket type carrying resolved fusion sources (Fusion Input → Fusion encode).
NynxzFusionInputData = io.Custom("NYNXZ_FUSION_INPUT")

# Wire/socket type carrying the inspector payload (Fusion encode → Fusion Inspector).
NynxzFusionInspect = io.Custom("NYNXZ_FUSION_INSPECT")
