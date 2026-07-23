"""Theme group: no nodes, just the runtime theme-discovery HTTP route (see `api.py`).

The node scanner recurses into this package and imports `api.py`, which registers
the route as an import side effect — the same pattern fusion/lora use for their APIs.
"""
