"""Visual fusion nodes.

  * QwenImageEditFusion — the original: autogrow IMAGE sockets, equal-weight blend.
  * fusion_input        — the Vue grid: drop images, set strength / fit / mute, reorder.
  * fusion_encode       — fuses a Fusion Input's images into one conditioning.

All three share `_fusion.py`, which owns the weight/blend math. `api.py` registers the
HTTP route the grid's browse dialog lists images with; importing it here is what installs
the route (the node scanner only imports modules that define nodes).
"""

from . import api  # noqa: F401 - imported for its route registration side effect
