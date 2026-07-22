"""HTTP route for the Fusion Input grid's browse dialog: list images in a ComfyUI folder.

Only a listing route is needed — thumbnails come from ComfyUI's own /view endpoint and
uploads go through its /upload/image (which hash-compares same-named files, so dropping
the same image twice doesn't litter the input dir).
"""

from __future__ import annotations

import os

from aiohttp import web

from . import _library

try:
    import folder_paths
except ImportError:  # outside ComfyUI (e.g. syntax checks)
    folder_paths = None

try:
    from server import PromptServer

    _routes = PromptServer.instance.routes
except Exception:  # noqa: BLE001 - no server (import-time checks, tests)
    _routes = None

_IMAGE_EXTS = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp")


def _base_dir(folder_type: str):
    if not folder_paths:
        return None
    if folder_type == "temp":
        return folder_paths.get_temp_directory()
    if folder_type == "output":
        return folder_paths.get_output_directory()
    return folder_paths.get_input_directory()


def _list_images(folder_type: str = "input") -> list[dict]:
    items: list[dict] = []
    base = _base_dir(folder_type)
    if not base or not os.path.isdir(base):
        return items
    for root, _dirs, files in os.walk(base):
        for name in files:
            if not name.lower().endswith(_IMAGE_EXTS):
                continue
            full = os.path.join(root, name)
            rel = os.path.relpath(full, base).replace("\\", "/")
            # size + mtime are cheap (os.stat, no decode); dimensions are read client-side
            # off the loaded thumbnail, so we never open an image here.
            try:
                stat = os.stat(full)
                size, mtime = stat.st_size, int(stat.st_mtime)
            except OSError:
                size, mtime = 0, 0
            items.append(
                {
                    "name": rel,
                    "filename": name,
                    "subfolder": os.path.dirname(rel),
                    "type": folder_type,
                    "size": size,
                    "mtime": mtime,
                }
            )
    items.sort(key=lambda item: item["name"].lower())
    return items


if _routes is not None:

    @_routes.get("/nynxz/experimental/images")
    async def nynxz_experimental_images(request):
        folder_type = request.rel_url.query.get("type", "input")
        if folder_type not in ("input", "temp", "output"):
            folder_type = "input"
        return web.json_response({"images": _list_images(folder_type), "type": folder_type})

    # --- Fusion Studio preset Library --------------------------------------------------
    @_routes.get("/nynxz/experimental/stages")
    async def nynxz_experimental_stages(_request):
        return web.json_response({"stages": _library.list_stages()})

    @_routes.post("/nynxz/experimental/stages/save")
    async def nynxz_experimental_stage_save(request):
        try:
            body = await request.json()
        except Exception:  # noqa: BLE001 - malformed body
            return web.json_response({"error": "bad request"}, status=400)
        name = str(body.get("name") or "").strip()
        stage = body.get("stage")
        if not name or not isinstance(stage, dict):
            return web.json_response({"error": "name and stage required"}, status=400)
        stem = _library.save_stage(
            name, stage, thumb=body.get("thumb"), overwrite=bool(body.get("overwrite", True))
        )
        return web.json_response({"ok": True, "stem": stem})

    @_routes.post("/nynxz/experimental/stages/delete")
    async def nynxz_experimental_stage_delete(request):
        try:
            body = await request.json()
        except Exception:  # noqa: BLE001 - malformed body
            return web.json_response({"error": "bad request"}, status=400)
        stem = str(body.get("stem") or "").strip()
        if not stem:
            return web.json_response({"error": "stem required"}, status=400)
        return web.json_response({"ok": _library.delete_stage(stem)})

    @_routes.get("/nynxz/experimental/stage_thumb")
    async def nynxz_experimental_stage_thumb(request):
        stem = request.rel_url.query.get("stem", "")
        path = _library.thumb_path(stem) if stem else None
        if not path:
            return web.Response(status=404)
        return web.FileResponse(path)
