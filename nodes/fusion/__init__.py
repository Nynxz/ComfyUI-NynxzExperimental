"""Visual fusion nodes.

  * fusion_input        — the Vue grid: drop images, set strength / fit / mute, reorder.
  * fusion_images       — the wire side: autogrow IMAGE sockets, same per-source controls.
  * fusion_encode       — fuses a Fusion Input's images into one conditioning.

Two collectors, split by where the images live: files on disk (grid) or a wire (images).
Both emit the same `fusion_input`, and either can be chained into the other.

They all share `_fusion.py`, which owns the weight/blend/style math. `api.py` registers the
HTTP route the grid's browse dialog lists images with; importing it here is what installs
the route (the node scanner only imports modules that define nodes).
"""

from . import api  # noqa: F401 - imported for its route registration side effect
