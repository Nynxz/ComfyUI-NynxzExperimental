# Nynx'z Experimental Nodes

Experimental ComfyUI nodes — the stuff that's still moving. Node ids, schemas and
behaviour here can change between commits. For the settled ones, see
[Nynx'z Custom Nodes](https://github.com/nynxz-dev/ComfyUI-NynxzNodes).

## Nodes

### Fusion — `Nynxz/Fusion`

Spatial visual-token fusion for Qwen3-VL image editing. Each source image is encoded
independently, then their **visual** conditioning tokens are blended on a shared spatial
grid — so a single edit can draw on many reference images at once, and you control how
much each one gets a say.

| Node | What it does |
| --- | --- |
| **Fusion Input** | The image grid. Drop images on it, weight each one, mute, reorder, remove. Outputs `fusion_input`. |
| **Fusion Reference** | The plain-wire alternative: one IMAGE + a strength, chained. Use regular Load Image nodes. |
| **Fusion Images** | Autogrow IMAGE sockets → `fusion_input` in one node. Wire several Load Image nodes straight in, no chaining. |
| **Text Encode Qwen Image Edit (Fusion)** | Takes a `fusion_input` plus your prompt and fuses it all into one conditioning. |

Wire it up as: `Fusion Input → Text Encode Qwen Image Edit (Fusion) → KSampler`.

**One image is a valid fusion.** The blend is then a passthrough, which is what you want when
you're using the node for style release (below) or just as a single-reference encode. Fusion
Input, Fusion Reference and the encode node all accept a single source.

#### Fusion Input

- **Drop images** anywhere on the node, or **Add images** / **Browse** to pick from your
  `input/`, `output/` or `temp/` folders. An image that's **already in `input/` is referenced,
  not re-uploaded** (matched by name + size), so dropping the same file twice never copies it
  into `input/` — only genuinely new images are uploaded.
- **Strength** is *relative prevalence*, not an absolute gain. Doubling everything changes
  nothing; halving one image hands its share of each token to whoever else contributes
  there. The `%` under each card is its real share of the result, live.
- **Mute** (the eye) drops an image from the blend without removing it.
- **Order matters.** The spatial patterns assign grid cells by source index, so image 1 and
  image 2 land in different cells. Drag a thumbnail to reorder.
- **Fit is per card** — the frame icon in each card's corner cycles `contain` (whole image,
  letterboxed — the default), `cover` (center-crop to fill) and `stretch` (distort to fill).
  The thumbnail mirrors the choice, so what you see on the card is exactly what the encoder
  gets. Force one mode for every source with the encode node's `fit` override.
- Chain **Fusion Input → Fusion Input** to group sources across several grids.
- Images are files on disk, not sockets — that's what lets every card show a real thumbnail
  and carry a visible weight. To fuse something generated upstream, run it through a Preview
  or Save node and pick it out of `temp/` or `output/`.

#### Fusion Reference

Same `fusion_input` as the grid, built from an ordinary IMAGE socket instead of a file on
disk — so anything generated upstream (a sampler, a mask composite) can be a reference without
a round trip through `temp/`.

```
Load Image ─→ Fusion Reference ─→ Fusion Reference ─→ Text Encode ... (Fusion)
                    ↑ image             ↑ image
```

- **Chain order is source order**, matching Fusion Input, so it decides which grid cells each
  image gets. Mix the two freely — a grid can feed a Fusion Reference and vice versa.
- **`strength`** is the same relative prevalence the grid's cards carry.
- A **batched IMAGE contributes one reference per frame**, in batch order.
- Carries its own **`fit`** (`contain`/`cover`/`stretch`), like a grid card. The encode node's
  `fit` override can force one mode for every source.

#### Fusion Images

The multi-socket collector, for when several images already live on separate Load Image nodes
and you'd rather not chain Fusion References:

```
Load Image ─┐
Load Image ─┼─→ Fusion Images ─→ Text Encode ... (Fusion)
Load Image ─┘   (autogrow sockets)
```

- **Autogrow sockets** — a new IMAGE input appears as you fill them, up to 16.
- Every socket contributes at **equal strength**, framed by the node's shared **`fit`**. Want
  per-image strength or fit? Use the grid or chain Fusion References; this one trades that for
  one-node convenience.
- A **batched IMAGE adds one source per frame**, and an optional upstream `fusion_input` is
  prepended, so it still chains with the other collectors if you want.

#### Text Encode Qwen Image Edit (Fusion)

Holds the prompt and the tuning:

| Knob | Does |
| --- | --- |
| `visual_aspect` / `visual_size` | The shared grid every source is fitted into. `auto` takes the aspect from the first image; set it explicitly if a portrait first image is letterboxing your landscapes too hard. Bigger `visual_size` = more visual tokens = finer fusion, more compute. |
| `fit` | How sources are framed into the grid. `per image` honours each card / Fusion Reference; `cover` / `contain` / `stretch` force one mode for all. **`cover`** gives the old center-crop framing the pack used before fit was a choice. |
| `strength_roll` | **More variety from the same images.** Seed-driven random re-weighting of the blend — shifts which image dominates each run. The one that actually moves the mix. `0` = off. See below. |
| `pattern_jitter` | Subtler spatial variety: reassigns a fraction of grid cells to a different image by seed. Rearranges the same tokens rather than re-weighting them, so it moves the result less. `0` = the clean pattern (default). |
| `fusion_method` | How cells are handed out: `spatial-checkerboard`, `spatial-block-interleave` (see `block_size`), `spatial-dither-random` (see `dither_ratio` + `seed`). |
| `blend_strength` | `0.0` = hard per-cell mosaic (original behaviour) → `1.0` = fully feathered. |
| `feather` | Gaussian softening, in grid cells, of each source's territory. |
| `preserve_norm` | Rescales blended tokens to keep embedding magnitude, so blends don't wash out. |
| `content_mode` / `content_strength` / `content_temperature` | Derive weights from the tokens themselves instead of geometry alone: `saliency` (foreground wins), `energy` (strongest signal wins), `cross-attention` (agreement with the per-cell consensus — smoother). |
| `style_mode` / `style_strength` | **Experimental.** Loosen the reference's grip on style so the prompt/LoRA can set the look. Off by default. See below. |

Order of operations: geometry → content → per-image strength → renormalize per token → blend
→ style release. Strength is applied last of the *weights*, so it re-weights whatever geometry
and content settled on; style release then acts on the blended tokens, never on who
contributed them.

##### Style release — `style_mode` / `style_strength`

For the anime→photoreal case: the style is supposed to come from your prompt and a LoRA (a
`2real`-style one), but the reference image's visual tokens keep voting for the look it
already *has*, and they're strong. Turning the whole block down would cost you the structure
too. Style release instead splits the tokens the AdaIN way — per-channel statistics across the
block are the *look*, each token's normalized residual is *what's where* — and flattens only
the former. Measured on realistic token statistics, both modes retain the content structure
exactly (correlation `+1.0000` against the original structure) while erasing the signature:

| `style_mode` | Removes | Leaves |
| --- | --- | --- |
| `gist` | the block's mean token — its overall "look" | per-channel scale (anisotropy). Gentler. |
| `whiten` | mean **and** per-channel scale — the full AdaIN signature | per-token structure only. Stronger. |

- **`style_strength` 0 is an exact no-op** and the default, so every existing workflow is
  bit-for-bit unchanged. Start around **0.3–0.5**.
- High values push tokens away from what the encoder normally emits, so expect it to fall
  apart near 1.0 — that's the trade, not a bug.
- It is a *hypothesis*, tested for its math and its no-op guarantees but not for whether it
  makes your generations better. That part needs your eyes and an A/B at a fixed seed.

##### Variety from the same images — `strength_roll` and `pattern_jitter`

The fusion is otherwise deterministic — identical images always fuse the same way (only
`spatial-dither-random` reads the seed). Two seed-driven knobs re-roll it, both off at `0` so
existing workflows are bit-for-bit unchanged, both driven by the same `seed` widget that
auto-increments after every run. So raise one, queue repeatedly, and each run differs.

There's a real difference in *how much* they move the result, and it's structural, not a
matter of magnitude:

- **`strength_roll`** randomly re-weights the blend each run — it shifts *which reference
  dominates the mix*. That's a change to the blend proportions, which the renormalize carries
  all the way through, so it's the one that visibly re-rolls the output. Multiplicative and
  log-symmetric (a source is as likely to be pushed up as down), bounded to ¼×–4× at `1.0`;
  muted images stay muted. Try **~0.5**.
- **`pattern_jitter`** rearranges *which cell* each image owns. It shuffles the same visual
  tokens spatially rather than re-weighting them, and the model integrates over the whole
  block, so it moves the result much less — useful for subtle spatial variation, not big
  swings. Works on any `fusion_method`.

Both are verified for their math and their no-op guarantees (0 = exact no-op, seed-tracking,
bounded, muted-stays-muted). Whether the variety *feels* right — and a good default value —
is yours to judge on real generations; the honest lever for big swings is `strength_roll`.

### LoRA — `Nynxz/LoRA`

A multi-LoRA **stack widget** on the node: each row has an on/off toggle, a searchable and
bookmarkable picker (with sidecar preview thumbnails), and a strength. Build the stack right
on the node instead of chaining single-LoRA loaders.

| Node | What it does |
| --- | --- |
| **LoRA Loader** | MODEL in → the stack → MODEL out. No CLIP — the common case. |
| **LoRA Loader (CLIP)** | MODEL + CLIP in → the stack → MODEL + CLIP out, for when you also patch CLIP. |
| **LoRA Picker** | Headless: just the stack, output on a wire. One picker can feed several Apply nodes. |
| **Apply LoRA** | Applies a Picker's stack to MODEL + CLIP. |

Each row's strength applies to both model and CLIP; set a separate CLIP strength per row if you
need it. Bookmarks persist in a `favorites.json` beside the pack (gitignored, never shipped).

## Interactive background

An optional WebGL grid of glowing dots behind the node graph — it reacts to your cursor and
follows your theme colors. **Off by default**; turn it on in **ComfyUI Settings → Nynxz
Experimental → Canvas → Interactive background**. The choice persists via ComfyUI's own settings
store, and the render machinery only spins up once you enable it, so leaving it off costs nothing.


## Development

The frontend is Vue + TypeScript in `src/`, built into `web/` (served via `WEB_DIRECTORY`).

```bash
npm install
npm run build      # → web/main.js
npm run dev        # watch
npm run typecheck
```

**Building needs [ZenKit](https://github.com/nynxz-dev/ZenKit) checked out as a sibling
directory** — `@zenkit/ui` is bundled from its source at build time (`../ZenKit/packages/ui/src`).
There's no *runtime* dependency on ZenKit: the components are plain Vue SFCs, and
`comfy-bridge.css` maps `--zen-*` onto ComfyUI's own theme vars, so they follow your ComfyUI
theme with zero JS. If ZenKit *is* installed, middle-clicking Fusion Input's `fusion_input`
output spawns and wires the encode node.

### Layout

Add a node group = a directory under `nodes/` with an `__init__.py`; add a node = a `*.py`
in it that subclasses `NynxzNode`. Both are picked up automatically — no registry to edit.
`_`-prefixed modules (`_base.py`, `_fusion.py`) are helpers and are skipped by the scan.

```
nodes/fusion/
  _fusion.py       the weight/blend/style math — one copy, shared by every fusion node
  _io_types.py     NYNXZ_FUSION_GRID (on-node widget) + NYNXZ_FUSION_INPUT (wire)
  fusion_input.py  fusion_reference.py  fusion_images.py  fusion_encode.py  api.py
src/fusion/
  node.ts          FusionGrid.vue    api.ts
```

## Credits

Third-party code and licenses: [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).