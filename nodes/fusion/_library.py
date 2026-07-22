"""Saved-preset storage for Fusion Studio stages (the Library).

Each preset is a small sidecar in a managed `nynxz_stages/` folder: `{stem}.json` holds
`{name, stage, version}` (the stage is the same layout the node serializes), and an optional
`{stem}.thumb.jpg` is a schematic thumbnail the Vue Library renders. Mirrors Ideogram Helper's
Studio Library, trimmed to what a stage needs.

Underscore-prefixed so the node scanner skips it; imported by `api.py` for its routes.
"""

from __future__ import annotations

import base64
import json
import os
import re
import time

try:
    import folder_paths
except ImportError:  # outside ComfyUI
    folder_paths = None

_THUMB_SUFFIX = ".thumb.jpg"


def _library_dir() -> str:
    """Managed library folder for saved stages; created on use. User dir → output dir → base."""
    base = None
    if folder_paths is not None:
        for getter in ("get_user_directory", "get_output_directory"):
            fn = getattr(folder_paths, getter, None)
            if callable(fn):
                try:
                    base = fn()
                    break
                except Exception:  # noqa: BLE001
                    base = None
        if base is None:
            base = getattr(folder_paths, "base_path", None)
    if not base:
        base = os.path.dirname(os.path.abspath(__file__))
    d = os.path.join(base, "nynxz_stages")
    os.makedirs(d, exist_ok=True)
    return d


def _safe_path(dirpath: str, name: str) -> str:
    """Resolve `name` within `dirpath`, rejecting path traversal."""
    root = os.path.realpath(dirpath)
    full = os.path.realpath(os.path.join(root, name))
    if full != root and not full.startswith(root + os.sep):
        raise ValueError("path escapes directory")
    return full


def _slug(name: str) -> str:
    """A filesystem-safe stem from a display name."""
    s = re.sub(r"[^a-zA-Z0-9 _-]", "", str(name or "")).strip()
    s = re.sub(r"\s+", "-", s)
    return s[:64] or "stage"


def thumb_path(stem: str) -> str | None:
    """Absolute path to a preset's thumbnail, or None if it doesn't exist / is unsafe."""
    try:
        path = _safe_path(_library_dir(), _slug(stem) + _THUMB_SUFFIX)
    except ValueError:
        return None
    return path if os.path.isfile(path) else None


def list_stages() -> list[dict]:
    """Every saved preset: `{stem, name, mtime, has_thumb, stage}`, newest first."""
    d = _library_dir()
    out: list[dict] = []
    for fname in os.listdir(d):
        if not fname.endswith(".json"):
            continue
        stem = fname[:-5]
        try:
            with open(_safe_path(d, fname), encoding="utf-8") as f:
                data = json.load(f)
        except (OSError, ValueError, json.JSONDecodeError):
            continue
        if not isinstance(data, dict) or "stage" not in data:
            continue
        try:
            mtime = int(os.path.getmtime(os.path.join(d, fname)))
        except OSError:
            mtime = 0
        out.append(
            {
                "stem": stem,
                "name": str(data.get("name") or stem),
                "mtime": mtime,
                "has_thumb": os.path.isfile(os.path.join(d, stem + _THUMB_SUFFIX)),
                "stage": data.get("stage"),
            }
        )
    out.sort(key=lambda item: item["mtime"], reverse=True)
    return out


def _next_free_stem(d: str, stem: str) -> str:
    """`stem`, or `stem-2`, `stem-3`, … if a preset with that name already exists."""
    if not os.path.exists(os.path.join(d, stem + ".json")):
        return stem
    i = 2
    while os.path.exists(os.path.join(d, f"{stem}-{i}.json")):
        i += 1
    return f"{stem}-{i}"


def save_stage(name: str, stage, thumb: str | None = None, overwrite: bool = True) -> str:
    """Write a preset. Returns the stem used (auto-numbered when overwrite is False)."""
    d = _library_dir()
    stem = _slug(name)
    if not overwrite:
        stem = _next_free_stem(d, stem)
    payload = {"name": str(name or stem), "stage": stage, "version": 1, "saved": int(time.time())}
    with open(_safe_path(d, stem + ".json"), "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
    if thumb:
        _write_thumb(d, stem, thumb)
    return stem


def _write_thumb(d: str, stem: str, data_uri: str) -> None:
    """Decode a `data:image/...;base64,…` thumbnail to `{stem}.thumb.jpg`. Best-effort."""
    try:
        b64 = data_uri.split(",", 1)[1] if "," in data_uri else data_uri
        with open(_safe_path(d, stem + _THUMB_SUFFIX), "wb") as f:
            f.write(base64.b64decode(b64))
    except (ValueError, OSError, base64.binascii.Error):  # type: ignore[attr-defined]
        pass


def delete_stage(stem: str) -> bool:
    """Remove a preset's json + thumbnail. True if the json was there."""
    d = _library_dir()
    safe = _slug(stem)
    removed = False
    for suffix in (".json", _THUMB_SUFFIX):
        try:
            path = _safe_path(d, safe + suffix)
        except ValueError:
            continue
        if os.path.isfile(path):
            try:
                os.remove(path)
                if suffix == ".json":
                    removed = True
            except OSError:
                pass
    return removed
