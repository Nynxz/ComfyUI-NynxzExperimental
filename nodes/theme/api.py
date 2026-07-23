"""Runtime theme discovery: list the theme packs on disk.

Themes are pure JSON, NOT part of the frontend build — `themes/<id>/theme.json` at
the pack root. This route scans that folder at request time and returns the parsed
packs, so dropping a new JSON in (or editing one) shows up on a browser reload with
no rebuild. The frontend (`src/theme/`) registers what it gets and applies the one
the ComfyUI setting names.

A pack may carry a `css` field: either CSS *text* (kept as-is) or a filename / list
of filenames relative to the theme folder, which we read and inline here — so the
frontend only ever sees resolved CSS, never a path. None of the shipped themes use
it, but user themes can.

Route mirrors `nodes/fusion/api.py`: registered as an import side effect on
`PromptServer.instance.routes`, guarded so import outside ComfyUI is a no-op.
"""

from __future__ import annotations

import json
import os

from aiohttp import web

# themes/ lives at the pack root: nodes/theme/api.py -> ../../themes
_THEMES_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "themes",
)

try:
    from server import PromptServer

    _routes = PromptServer.instance.routes
except Exception:  # noqa: BLE001 - no server (import-time checks, tests)
    _routes = None


def _resolve_css(pack: dict, folder: str) -> None:
    """Resolve a `css` field of filename ref(s) into inlined CSS text, in place.

    A `css` that already looks like CSS (contains `{`) or isn't a plain filename is
    left untouched. Missing files are dropped so a dangling ref never reaches the
    client as bogus CSS.
    """
    css = pack.get("css")
    refs = css if isinstance(css, list) else [css] if isinstance(css, str) else []
    if not refs:
        return
    # Treat a value that's clearly CSS text (has a brace) as already resolved.
    if any(isinstance(r, str) and "{" in r for r in refs):
        return
    parts: list[str] = []
    for ref in refs:
        if not isinstance(ref, str) or not ref.strip():
            continue
        name = os.path.basename(ref)  # never escape the theme folder
        path = os.path.join(folder, name)
        try:
            with open(path, encoding="utf-8") as fh:
                parts.append(fh.read())
        except OSError:
            continue
    if parts:
        pack["css"] = "\n".join(parts)
    else:
        pack.pop("css", None)


def _list_themes() -> list[dict]:
    """Parse every `themes/<id>/theme.json`, id-sorted. Bad files are skipped."""
    packs: list[dict] = []
    if not os.path.isdir(_THEMES_DIR):
        return packs
    for name in sorted(os.listdir(_THEMES_DIR)):
        folder = os.path.join(_THEMES_DIR, name)
        path = os.path.join(folder, "theme.json")
        if not os.path.isfile(path):
            continue
        try:
            with open(path, encoding="utf-8") as fh:
                pack = json.load(fh)
        except (OSError, ValueError):
            continue
        if not isinstance(pack, dict):
            continue
        _resolve_css(pack, folder)
        packs.append(pack)
    return packs


if _routes is not None:

    @_routes.get("/nynxz/experimental/themes")
    async def nynxz_experimental_themes(_request):
        return web.json_response({"themes": _list_themes()})

    @_routes.get("/nynxz/experimental/theme_asset")
    async def nynxz_experimental_theme_asset(request):
        # Serve an image/asset a theme ships beside its JSON (referenced from `regions` as a bare
        # `url(name)`). basename() both params so nothing can escape themes/<id>/.
        theme_id = os.path.basename(request.rel_url.query.get("id", ""))
        file = os.path.basename(request.rel_url.query.get("file", ""))
        if not theme_id or not file:
            return web.Response(status=400)
        path = os.path.join(_THEMES_DIR, theme_id, file)
        if not os.path.isfile(path):
            return web.Response(status=404)
        return web.FileResponse(path)
