from typing import Any

from comfy_api.latest import io


class NynxzNode(io.ComfyNode):
    """Shared base for Nynxz nodes.

    Centralizes the node-id namespace and menu category so individual nodes
    don't repeat them. Subclass this and build the schema via `make_schema`.
    """

    NAMESPACE = "nynxz.experimental"
    CATEGORY = "Nynxz/Experimental"

    @classmethod
    def make_schema(cls, node_id: str, display_name: str, **kwargs) -> io.Schema:
        return io.Schema(
            node_id=f"{cls.NAMESPACE}.{node_id}",
            display_name=display_name,
            category=cls.CATEGORY,
            **kwargs,
        )


def widget_input(socketless: bool = True):
    """Build a WidgetInput subclass that renders as an on-node widget (no input socket).

    Custom io types whose value is edited by a Vue component rather than wired in use this
    for their `.Input`: ComfyUI keys the frontend widget on the io_type (see
    `src/lib/registerNodes.ts`) and gives the node no socket for it.
    """

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
                id, display_name, optional, tooltip,
                None, default, socketless, None, None, None, None, advanced,
            )

    return _WidgetInput
