"""Backend favorites store for ComfyUI-Nynxz.

A tiny JSON file (favorites.json next to the pack) holding bookmarked LoRA names.
Kept process-cached so reads are free; writes are atomic-ish (write temp, replace).
"""

from __future__ import annotations

import json
import os

_STORE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "favorites.json")
_cache: list[str] | None = None


def _read() -> list[str]:
    global _cache
    if _cache is not None:
        return _cache
    try:
        with open(_STORE, encoding="utf-8") as f:
            data = json.load(f)
        _cache = [str(x) for x in data.get("loras", [])] if isinstance(data, dict) else []
    except (OSError, ValueError):
        _cache = []
    return _cache


def _write(items: list[str]) -> None:
    global _cache
    _cache = items
    tmp = _STORE + ".tmp"
    try:
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump({"loras": items}, f, indent=2)
        os.replace(tmp, _STORE)
    except OSError as e:
        print(f"[Nynxz] could not save favorites: {e}")


def get_favorites() -> list[str]:
    return list(_read())


def toggle(name: str, pinned: bool) -> list[str]:
    """Add/remove `name`; returns the new favorites list."""
    items = list(_read())
    if pinned and name not in items:
        items.append(name)
    elif not pinned and name in items:
        items = [x for x in items if x != name]
    _write(items)
    return items
