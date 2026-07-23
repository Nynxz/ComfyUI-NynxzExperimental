# Themes

Pure-JSON theme packs that recolour the whole ComfyUI interface. Discovered **at runtime**
from this folder — drop a `themes/<id>/theme.json` in, reload the browser, and it appears in
the **Nynxz Experimental → Appearance → Theme** setting. No rebuild, nothing bundled.

Engine: `src/theme/engine.ts` (ported from ZenKit core — MIT, same author; keep it a faithful
copy so it re-merges cleanly). Discovery route: `nodes/theme/api.py`.

## Format

```jsonc
{
  "id": "my-theme",          // unique, kebab-case (must match the folder name)
  "name": "My Theme",        // shown in the picker
  "modes": ["light", "dark"], // optional; derived from which token sets exist if omitted
  "tokens": {
    "dark":  { "--background": "#1a1a1f", "--primary": "#8b5cf6", ... },
    "light": { "--background": "#ffffff", "--primary": "#7c3aed", ... }
  },
  "css": "..."               // optional escape hatch — see below
}
```

Define `dark`, `light`, or both. A single-mode pack still applies in the other mode (it falls
back to the token set it has), but define both for a clean result — mode follows ComfyUI's own
light/dark toggle, we never override it.

### Tokens

Semantic (shadcn-style) tokens. You only need the core set — anything you omit is filled from a
related token, so partial packs render fine:

| Core | |
|---|---|
| `--background` / `--foreground` | page bg + default text |
| `--card` / `--card-foreground` | node/panel surface + its text |
| `--popover` / `--popover-foreground` | menus/tooltips |
| `--primary` / `--primary-foreground` | accent + text that sits **on** it |
| `--secondary` / `--secondary-foreground` | widget surfaces |
| `--muted` / `--muted-foreground` | dim surfaces + secondary text |
| `--accent` / `--accent-foreground` | hover/selected surfaces |
| `--destructive` / `--destructive-foreground` | errors/delete |
| `--border` · `--input` · `--ring` | outlines, fields, focus ring |
| `--radius` | corner rounding (drives the whole scale) |

Extended (optional, for a first-class pack): `--chart-1`…`--chart-5`, and the `--sidebar*`
family. See `nynxz/theme.json` for a full example, `gruvbox/theme.json` for a hex one.

### Colour format

Use **hex or `rgb()`**. The engine auto-computes a readable text colour for your accent (so a
light/yellow primary doesn't get unreadable white text) by parsing the colour — and it can only
parse hex/rgb. `oklch()` works for the chrome but the accent-contrast helper can't read it, so
pin `--primary-foreground` yourself if you use it.

### `regions` — style specific UI parts (borders, patterns, assets)

`regions` maps a **friendly region name** to a set of CSS declarations, so you can style a part of
the ComfyUI chrome without knowing its selector. Rules are scoped to your pack (they never leak
into another theme) and use `!important` so they win over ComfyUI's own styles.

```jsonc
"regions": {
  "sideToolbar": {
    "border-right": "1px solid var(--primary)",
    "background-image": "url(hatch.svg)",   // a file shipped beside theme.json
    "background-repeat": "repeat"
  }
}
```

Region names: `sideToolbar`, `topBar`, `bottomBar`, `menuBar`, `nodeHeader`, `node`, `minimap`
(unknown names are skipped). Values are plain CSS — and `var(--token)` works, so region styling
follows your palette **and** the active light/dark mode automatically.

**Assets.** A bare `url(name.svg)` / `url(name.png)` ref resolves to a file next to your
`theme.json` (`themes/<id>/name.svg`), served on demand — so a pack can ship patterns, textures,
or border images. Absolute, `data:`, and `http` URLs are left alone. See `gruvbox/` for a working
example (a hatch pattern + accent border on the side-toolbar).

> Region selectors target ComfyUI's live DOM, which can shift between versions — but the mapping
> lives in one place (`REGION_SELECTORS` in `src/theme/engine.ts`), so a rename is fixed once.

### `css` — raw escape hatch

When a region doesn't cover what you need, `css` is injected verbatim (scoped, `<style>` text —
can't run script). Scope every rule under `html[data-nynxz-theme="<your-id>"]` yourself:

```jsonc
"css": "html[data-nynxz-theme=\"my-theme\"] .some-comfy-class { ... }"
```

## Preview

Regenerate the visual gallery of every theme (both modes) after adding one:

```
node dev/gen-theme-previews.mjs
```

Writes `docs/theme-previews.html` — open it in a browser to eyeball contrast and palette.
