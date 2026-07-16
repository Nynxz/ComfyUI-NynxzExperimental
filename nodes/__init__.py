"""Auto-discovery for all Nynxz experimental nodes.

To add a node: drop a `*.py` file in a group directory here with a class that
subclasses `io.ComfyNode` (or `NynxzNode`). It registers automatically — no edits
here, and none in the pack's `__init__.py`. To add a group: make a directory with
an `__init__.py`; the scan recurses into it.

Modules and packages whose name starts with `_` (e.g. `_base.py`, `_fusion.py`) are
treated as helpers and are not scanned — use that prefix for anything that subclasses
`io.ComfyNode` without being a real node.
"""

import importlib
import inspect
import pkgutil
from types import ModuleType

from comfy_api.latest import io


def _iter_modules(path: list[str], prefix: str):
    """Import and yield every module under `path`, recursing into subpackages."""
    for info in sorted(pkgutil.iter_modules(path), key=lambda m: m.name):
        if info.name.startswith("_"):
            continue
        name = f"{prefix}.{info.name}"
        module = importlib.import_module(name)
        yield module
        if info.ispkg:
            yield from _iter_modules(module.__path__, name)


def _nodes_in(module: ModuleType) -> list[type[io.ComfyNode]]:
    # Only classes actually defined in this module. That skips re-exports (a group's
    # `__init__.py` listing its nodes) and imported base classes, so each node is
    # collected exactly once, from the module that defines it.
    return [
        obj
        for _, obj in inspect.getmembers(module, inspect.isclass)
        if obj.__module__ == module.__name__
        and issubclass(obj, io.ComfyNode)
        and obj is not io.ComfyNode
    ]


def load_nodes() -> list[type[io.ComfyNode]]:
    return [node for module in _iter_modules(__path__, __name__) for node in _nodes_in(module)]
