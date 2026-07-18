"""Conditioning variation — nudge a conditioning with seeded noise. Pure torch, no ComfyUI.

A "variation seed" for conditioning: perturb the token (and pooled) vectors by a seeded noise
field so you get neighbouring variations of the same prompt without touching the sampler seed.
Noise is scaled to each token's own magnitude, so `strength` means the same thing regardless of
how loud a given conditioning is, and `preserve_norm` rescales the result back to the original
magnitude so the nudge changes *direction* (content) without changing activation energy — keeping
the variation coherent instead of louder/washed-out.
"""

from __future__ import annotations

import torch

_EPS = 1e-8


def _perturb(tensor: torch.Tensor, noise: torch.Tensor, strength: float, preserve_norm: bool):
    norm = tensor.norm(dim=-1, keepdim=True)
    scaled = noise * (norm / (noise.norm(dim=-1, keepdim=True) + _EPS))
    varied = tensor + strength * scaled
    if preserve_norm:
        varied = varied / (varied.norm(dim=-1, keepdim=True) + _EPS) * norm
    return varied


def vary_conditioning(conditioning, strength: float, seed: int, preserve_norm: bool = True):
    """Return a seeded variation of `conditioning`. `strength` 0 returns it unchanged."""
    if strength == 0.0:
        return conditioning
    # CPU generator so a seed reproduces regardless of the tensor's device.
    generator = torch.Generator().manual_seed(int(seed) & 0xFFFFFFFFFFFFFFFF)
    out = []
    for tensor, meta in conditioning:
        noise = torch.randn(tensor.shape, generator=generator).to(tensor)
        varied = _perturb(tensor, noise, strength, preserve_norm)
        new_meta = dict(meta) if meta else {}
        pooled = new_meta.get("pooled_output")
        if pooled is not None:
            pnoise = torch.randn(pooled.shape, generator=generator).to(pooled)
            new_meta["pooled_output"] = _perturb(pooled, pnoise, strength, preserve_norm)
        out.append([varied, new_meta])
    return out
