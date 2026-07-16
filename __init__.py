"""Nynxz's experimental ComfyUI nodes (V3 schema).

Each node group lives in its own directory under `nodes/` with its helpers, and is
discovered automatically (see `nodes/__init__.py`). Node groups that ship a UI build
their frontend from `src/` into `web/` (served via WEB_DIRECTORY).
"""

from comfy_api.latest import ComfyExtension, io

from .nodes import load_nodes

WEB_DIRECTORY = "./web"


class NynxzExperimentalExtension(ComfyExtension):
    async def get_node_list(self) -> list[type[io.ComfyNode]]:
        return load_nodes()


async def comfy_entrypoint() -> ComfyExtension:
    return NynxzExperimentalExtension()


__all__ = ["NynxzExperimentalExtension", "comfy_entrypoint"]
