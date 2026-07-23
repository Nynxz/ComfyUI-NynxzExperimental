// Theme engine: shadcn semantic-token packs → translated to ComfyUI/PrimeVue vars,
// written as ONE `!important` <style> rule (never inline, so ComfyUI's own vars are
// never overwritten) + an !important bridge <style> for the Nodes-2.0 DOM. A pack may
// also carry custom `css`, injected into its own <style> only while it's active. The
// 'comfy' pack = empty rules (ComfyUI owns its vars).
//
// Ported from the ZenKit core (packages/core/src/theme.ts + packages/theme) — Nynxz's own
// MIT project — trimmed for the runtime-free pack: the --zen-* fallback layer is supplied by
// the imported @zenkit/ui/comfy-bridge.css, and ZenKit's panel scrollbar CSS is dropped (no
// ZenKit panels here). Ids/attribute are namespaced `nynxz` so nothing collides if the full
// ZenKit is also installed. Persistence lives in the ComfyUI setting (see register.ts).

export type ThemeMode = 'light' | 'dark'

/** A theme pack: semantic token overrides for light and/or dark, plus optional custom
 *  CSS. This is the shape of a `themes/<id>/theme.json` file and of what registerPacks
 *  accepts — themes are data, not code. */
export interface ThemePack {
  id: string
  name: string
  modes?: ThemeMode[]
  tokens: { light?: Record<string, string>; dark?: Record<string, string> }
  /** Structured region styling: `{ <regionName>: { <css-prop>: <value> } }`. Region names map
   *  to stable ComfyUI selectors (see REGION_SELECTORS) so a theme can style the side-toolbar,
   *  bars, node headers, etc. without touching raw selectors. Values are plain CSS; a bare
   *  `url(foo.svg)` ref resolves to the theme's own asset route, so a pack can ship pattern /
   *  border images beside its JSON. `var(--token)` works too (regions are scoped under the
   *  active pack, so they follow its tokens + mode). */
  regions?: Record<string, Record<string, string>>
  /** Resolved CSS text (the Python route inlines any file refs), injected verbatim while
   *  this pack is active. The raw escape hatch beneath `regions` — target any selector. Trusted,
   *  local content — a <style> can't run script. */
  css?: string
}

/* ── managed <style> injection (from @zenkit/core dom.ts) ─────────────────────── */
function ensureStyle(id: string, content: string): void {
  let el = document.getElementById(id) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = id
    document.head.appendChild(el)
  }
  if (el.textContent !== content) el.textContent = content
}

/* ── validation + registry ────────────────────────────────────────────────────── */
const MODES = ['light', 'dark'] as const

/** Validate untrusted data (a JSON theme) into a ThemePack, or null if unusable. Keeps
 *  only string→string token entries, so a malformed file can't inject anything but CSS
 *  custom-property values. */
export function parsePack(data: unknown): ThemePack | null {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  if (typeof d.id !== 'string' || typeof d.name !== 'string') return null
  if (!d.tokens || typeof d.tokens !== 'object') return null

  const raw = d.tokens as Record<string, unknown>
  const tokens: ThemePack['tokens'] = {}
  for (const mode of MODES) {
    const set = raw[mode]
    if (!set || typeof set !== 'object') continue
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(set as Record<string, unknown>)) {
      if (typeof v === 'string') out[k] = v
    }
    if (Object.keys(out).length) tokens[mode] = out
  }
  if (!tokens.light && !tokens.dark) return null

  const modes = Array.isArray(d.modes)
    ? (d.modes.filter((m) => m === 'light' || m === 'dark') as ThemeMode[])
    : undefined
  const css = typeof d.css === 'string' && d.css.trim() ? d.css : undefined
  const regions = parseRegions(d.regions)

  return {
    id: d.id,
    name: d.name,
    ...(modes && modes.length ? { modes } : {}),
    tokens,
    ...(regions ? { regions } : {}),
    ...(css ? { css } : {}),
  }
}

// Validate a `regions` map into { region: { prop: string } }, keeping only string→string
// declarations (so a malformed file can't inject anything but CSS text). Returns undefined if
// nothing usable survives.
function parseRegions(data: unknown): Record<string, Record<string, string>> | undefined {
  if (!data || typeof data !== 'object') return undefined
  const out: Record<string, Record<string, string>> = {}
  for (const [region, style] of Object.entries(data as Record<string, unknown>)) {
    if (!style || typeof style !== 'object') continue
    const decls: Record<string, string> = {}
    for (const [prop, value] of Object.entries(style as Record<string, unknown>)) {
      if (typeof value === 'string' && value.trim()) decls[prop] = value
    }
    if (Object.keys(decls).length) out[region] = decls
  }
  return Object.keys(out).length ? out : undefined
}

const registry = new Map<string, ThemePack>()

/** Validate + register many packs; returns the ones that were valid, in registration order. */
export function registerPacks(list: unknown[]): ThemePack[] {
  const out: ThemePack[] = []
  for (const p of list) {
    const valid = parsePack(p)
    if (valid) {
      registry.set(valid.id, valid)
      out.push(valid)
    }
  }
  return out
}

/** All registered packs, in registration order. */
export function themePacks(): ThemePack[] {
  return [...registry.values()]
}

/** Modes a pack supports: explicit `modes`, else derived from which token sets it defines. */
export function packModes(id: string): ThemeMode[] {
  const p = registry.get(id)
  if (!p) return ['light', 'dark']
  if (p.modes?.length) return p.modes
  const m: ThemeMode[] = []
  if (p.tokens.light) m.push('light')
  if (p.tokens.dark) m.push('dark')
  return m.length ? m : ['dark']
}

/* ── token translation (core tokens → ComfyUI / PrimeVue vars) ─────────────────── */
// Fill missing core tokens from related ones.
const TOKEN_FALLBACKS: Record<string, string[]> = {
  '--background': ['--base-background', '--bg-color', '--content-bg'],
  '--foreground': ['--base-foreground', '--fg-color', '--content-fg'],
  '--primary': ['--primary-background', '--brand-blue', '--accent-primary'],
  '--primary-foreground': ['--button-surface-contrast', '--base-foreground'],
  '--secondary': ['--secondary-background', '--component-node-widget-background'],
  '--secondary-foreground': ['--component-node-foreground', '--foreground'],
  '--muted': ['--muted-background', '--component-node-widget-background'],
  '--muted-foreground': ['--text-secondary', '--component-node-foreground-secondary'],
  '--accent': ['--accent-background', '--component-node-surface'],
  '--accent-foreground': ['--component-node-foreground', '--foreground'],
  '--border': ['--border-default', '--node-component-border'],
  '--input': ['--input-surface', '--component-node-widget-background'],
  '--card': ['--component-node-background', '--node-component-surface'],
  '--card-foreground': ['--component-node-foreground', '--foreground'],
}

// Translate core tokens → ComfyUI / PrimeVue vars.
const COMFY_MAPPINGS: Array<[string, string[]]> = [
  ['--component-node-background', ['--card', '--background']],
  ['--component-node-border', ['--border', '--node-component-border']],
  ['--component-node-foreground', ['--card-foreground', '--foreground']],
  ['--component-node-foreground-secondary', ['--muted-foreground']],
  ['--component-node-surface', ['--card', '--background']],
  ['--component-node-widget-background', ['--secondary', '--input']],
  ['--component-node-widget-background-hovered', ['--accent', '--secondary']],
  ['--component-node-widget-background-selected', ['--accent', '--primary']],
  ['--component-node-widget-background-highlighted', ['--ring', '--primary']],
  ['--component-node-widget-advanced', ['--primary', '--accent']],
  ['--node-component-header-surface', ['--card', '--background']],
  ['--node-component-header', ['--foreground']],
  ['--node-component-slot-text', ['--muted-foreground', '--foreground']],
  ['--node-component-border', ['--border']],
  ['--node-component-surface', ['--card', '--background']],
  ['--node-component-ring', ['--ring', '--primary']],
  ['--base-background', ['--background']],
  ['--base-foreground', ['--foreground']],
  ['--primary-background', ['--primary']],
  ['--primary-background-hover', ['--accent', '--primary']],
  ['--primary-foreground', ['--primary-foreground', '--foreground']],
  ['--secondary-background', ['--secondary']],
  ['--secondary-background-hover', ['--accent', '--secondary']],
  ['--secondary-background-selected', ['--accent', '--primary']],
  ['--input-surface', ['--input', '--secondary']],
  ['--text-primary', ['--foreground']],
  ['--text-secondary', ['--muted-foreground', '--foreground']],
  ['--border-default', ['--border']],
  ['--bg-color', ['--background']],
  ['--fg-color', ['--foreground']],
  ['--content-bg', ['--card', '--background']],
  ['--comfy-menu-bg', ['--card', '--background']],
  ['--comfy-menu-secondary-bg', ['--secondary', '--card']],
  ['--comfy-input-bg', ['--input', '--secondary']],
  ['--border-color', ['--border']],
  ['--input-text', ['--foreground']],
  ['--descrip-text', ['--muted-foreground']],
  ['--p-primary-color', ['--primary']],
  ['--p-primary-hover-color', ['--primary-background-hover', '--accent', '--primary']],
  ['--p-primary-active-color', ['--primary-background-hover', '--accent', '--primary']],
  ['--p-primary-contrast-color', ['--primary-foreground', '--foreground']],
  ['--p-surface-0', ['--background']],
  ['--p-surface-50', ['--card', '--background']],
  ['--p-surface-100', ['--card', '--secondary']],
  ['--p-surface-200', ['--secondary']],
  ['--p-surface-300', ['--secondary-background-hover', '--accent']],
  ['--p-surface-400', ['--secondary-background-selected', '--accent']],
  ['--p-surface-500', ['--muted']],
  ['--p-surface-600', ['--secondary-background-hover', '--accent']],
  ['--p-surface-700', ['--card', '--background']],
  ['--p-surface-800', ['--background']],
  ['--p-surface-900', ['--background']],
  ['--p-surface-950', ['--background']],
  ['--p-content-background', ['--card', '--background']],
  ['--p-content-color', ['--foreground']],
  ['--p-content-border-color', ['--border']],
  ['--p-text-color', ['--foreground']],
  ['--p-text-muted-color', ['--muted-foreground']],
  ['--p-button-primary-background', ['--primary']],
  ['--p-button-primary-hover-background', ['--primary-background-hover', '--accent', '--primary']],
  ['--p-button-primary-active-background', ['--primary-background-hover', '--accent', '--primary']],
  ['--p-button-primary-border-color', ['--primary']],
  ['--p-button-primary-hover-border-color', ['--primary-background-hover', '--accent', '--primary']],
  ['--p-button-primary-color', ['--primary-foreground', '--foreground']],
  ['--p-button-primary-hover-color', ['--primary-foreground', '--foreground']],
  // ComfyUI's own .comfyui-button.primary (Run/Queue) uses --primary-bg/-fg, NOT the PrimeVue
  // vars — without these a light --primary keeps ComfyUI's default white text → unreadable.
  ['--primary-bg', ['--primary']],
  ['--primary-fg', ['--primary-foreground', '--foreground']],
  ['--primary-hover-bg', ['--primary-background-hover', '--accent', '--primary']],
  ['--primary-hover-fg', ['--primary-foreground', '--foreground']],
  ['--p-button-secondary-background', ['--secondary']],
  ['--p-button-secondary-hover-background', ['--accent', '--secondary']],
  ['--p-button-secondary-border-color', ['--border']],
  ['--p-button-secondary-color', ['--secondary-foreground', '--foreground']],
  ['--p-togglebutton-background', ['--secondary', '--input']],
  ['--p-togglebutton-border-color', ['--border']],
  ['--p-togglebutton-color', ['--foreground']],
  ['--p-togglebutton-checked-background', ['--primary-background-hover', '--accent', '--primary']],
  ['--p-togglebutton-checked-border-color', ['--primary-background-hover', '--accent', '--primary']],
  ['--p-togglebutton-checked-color', ['--foreground']],
  ['--p-form-field-background', ['--input', '--secondary']],
  ['--p-form-field-color', ['--foreground']],
  ['--p-form-field-border-color', ['--border']],
  ['--p-form-field-placeholder-color', ['--muted-foreground']],
  ['--p-tooltip-background', ['--popover', '--card', '--background']],
  ['--p-tooltip-color', ['--popover-foreground', '--card-foreground', '--foreground']],
  ['--p-slider-track-background', ['--input', '--secondary', '--border']],
  ['--p-slider-track-active-background', ['--primary']],
  ['--p-slider-range-background', ['--primary']],
  ['--p-slider-handle-background', ['--primary']],
  ['--p-slider-handle-content-background', ['--primary-foreground', '--background']],
  // ComfyUI 1.44.9 (Tailwind-era) semantic vars the chrome actually reads.
  ['--button-surface', ['--secondary', '--card', '--input']],
  ['--button-hover-surface', ['--accent', '--secondary']],
  ['--button-active-surface', ['--accent', '--primary']],
  ['--button-icon', ['--muted-foreground', '--foreground']],
  ['--button-surface-contrast', ['--primary-foreground', '--foreground']],
  ['--accent-primary', ['--primary', '--accent']],
  ['--accent-background', ['--accent', '--secondary']],
  ['--nav-background', ['--card', '--background']],
  ['--interface-menu-surface', ['--popover', '--card', '--background']],
  ['--interface-menu-component-surface-hovered', ['--accent', '--secondary']],
  ['--interface-menu-component-surface-selected', ['--accent', '--primary']],
  ['--interface-menu-stroke', ['--border']],
  ['--interface-panel-surface', ['--card', '--background']],
  // A prominent default makes the cursor/tool button look permanently "selected" — keep it a
  // subtle elevation, not the accent.
  ['--interface-panel-selected-surface', ['--secondary', '--card']],
  ['--interface-stroke', ['--border']],
  ['--dialog-surface', ['--popover', '--card', '--background']],
  ['--modal-panel-background', ['--card', '--background']],
  ['--backdrop', ['--background']],
  ['--destructive-background', ['--destructive']],
  ['--destructive-background-hover', ['--destructive']],
  ['--node-component-surface-hovered', ['--accent', '--secondary']],
  ['--node-component-surface-selected', ['--accent', '--primary']],
  ['--node-divider', ['--border']],
  ['--node-stroke', ['--border']],
  ['--node-border', ['--border']],
  ['--node-stroke-selected', ['--ring', '--primary']],
  // The "blue" — PrimeVue primary palette (set at runtime) + ComfyUI's brand blue.
  ['--p-primary-400', ['--primary']],
  ['--p-primary-500', ['--primary']],
  ['--p-primary-600', ['--primary']],
  ['--brand-blue', ['--primary', '--accent']],
]

function selectTokenValue(map: Record<string, string>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = map[k]
    if (typeof v === 'string' && v.trim()) return v
  }
  return undefined
}

function resolveThemeTokens(pack: ThemePack, mode: ThemeMode): Record<string, string> {
  const raw = (mode === 'dark' ? pack.tokens.dark : pack.tokens.light) || pack.tokens.light || pack.tokens.dark || {}
  const withFallbacks: Record<string, string> = { ...raw }
  for (const [target, keys] of Object.entries(TOKEN_FALLBACKS)) {
    if (withFallbacks[target]) continue
    const r = selectTokenValue(withFallbacks, keys)
    if (r) withFallbacks[target] = r
  }
  const translated: Record<string, string> = {}
  for (const [target, keys] of COMFY_MAPPINGS) {
    const r = selectTokenValue(withFallbacks, keys)
    if (r) translated[target] = r
  }
  return { ...translated, ...withFallbacks } // core tokens win over their translations
}

// Parse a hex / rgb() color to [r,g,b] (0-255), or null for forms we can't read.
function parseRgb(c: string): [number, number, number] | null {
  const s = (c || '').trim()
  let m = s.match(/^#([0-9a-f]{3})$/i)
  if (m) {
    const h = m[1]!
    return [0, 1, 2].map((i) => parseInt(h[i]! + h[i]!, 16)) as [number, number, number]
  }
  m = s.match(/^#([0-9a-f]{6})$/i)
  if (m) {
    const h = m[1]!
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i)
  if (m) return [+m[1]!, +m[2]!, +m[3]!]
  return null
}
// Pick black or white text for a background by which gives more contrast — fixes
// unreadable white-on-light-accent (e.g. a yellow primary in a theme).
function readableText(bg: string): string | null {
  const rgb = parseRgb(bg)
  if (!rgb) return null
  const lin = (v: number) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  const L = 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2])
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? '#ffffff' : '#15151a'
}

// ComfyUI's node execution progress bar reads three hardcoded Tailwind vars that default to a
// fixed blue. Derive them from the pack's --primary (secondary = a translucent primary). Spread
// as DEFAULTS beneath the resolved tokens so a pack can still override any of the three directly.
function jobProgressDefaults(map: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  const primary = selectTokenValue(map, ['--primary', '--accent'])
  if (primary) {
    out['--color-interface-panel-job-progress-primary'] = primary
    out['--color-interface-panel-job-progress-secondary'] = `color-mix(in srgb, ${primary} 35%, transparent)`
  }
  const fg = selectTokenValue(map, ['--foreground'])
  if (fg) out['--color-interface-panel-job-progress-border'] = fg
  return out
}

// Derive the --zen-* tokens (read by @zenkit/ui components + the interactive background) from
// the resolved core tokens, so an active pack retints them over the comfy-bridge.css fallbacks.
function zenDerived(map: Record<string, string>): Record<string, string> {
  const g = (...k: string[]) => selectTokenValue(map, k)
  const out: Record<string, string> = {}
  const set = (k: string, v?: string) => {
    if (v) out[k] = v
  }
  set('--zen-bg', g('--background'))
  set('--zen-surface', g('--card', '--background'))
  set('--zen-surface-2', g('--secondary', '--muted', '--card'))
  set('--zen-input', g('--input', '--secondary'))
  set('--zen-text', g('--foreground'))
  set('--zen-muted', g('--muted-foreground', '--foreground'))
  set('--zen-border', g('--border', '--input'))
  const accent = g('--primary', '--accent')
  set('--zen-accent', accent)
  // A light/yellow accent with white text is unreadable — compute a contrasting text colour,
  // falling back to the pack's own foreground only when the accent isn't a parseable color.
  set('--zen-accent-text', (accent && readableText(accent)) || g('--primary-foreground', '--background'))
  set('--zen-radius', g('--radius'))
  return out
}

// ComfyUI's --radius-* scale is fixed values (not derived from --radius), so override the whole
// scale relative to the pack's --radius — a 0-radius theme then goes square everywhere.
function radiusScale(r: string): Record<string, string> {
  return {
    '--radius': r,
    '--radius-sm': `calc(${r} * 0.5)`,
    '--radius-md': `calc(${r} * 0.75)`,
    '--radius-lg': r,
    '--radius-xl': `calc(${r} * 1.5)`,
    '--radius-2xl': `calc(${r} * 2)`,
    '--radius-3xl': `calc(${r} * 3)`,
    '--radius-4xl': `calc(${r} * 4)`,
    '--radius-5xl': `calc(${r} * 5)`,
  }
}

/* ── the Nodes-2.0 DOM bridge (direct !important rules) ────────────────────────── */
const ATTR = 'data-nynxz-theme'

// Direct !important rules on the ComfyUI 2.0 node DOM + chrome, gated on the active-pack attr.
const BRIDGE_RULES = `
html[${ATTR}] { --zen-node-radius: var(--radius, 10px); --radius-2xl: var(--zen-node-radius); }
html[${ATTR}] .bg-primary-background,
html[${ATTR}] .bg-primary-background *,
html[${ATTR}] [data-testid='queue-button'],
html[${ATTR}] [data-testid='queue-button'] * { color: var(--primary-foreground) !important; }
html[${ATTR}] .lg-node,
html[${ATTR}] .comfy-menu,
html[${ATTR}] .comfyui-body-top,
html[${ATTR}] .comfyui-body-bottom {
  background: var(--component-node-background, var(--card, var(--background))) !important;
  color: var(--component-node-foreground, var(--foreground)) !important;
  border-color: var(--component-node-border, var(--border)) !important;
}
html[${ATTR}] .lg-node { border-radius: var(--zen-node-radius) !important; }
html[${ATTR}] [data-testid="node-inner-wrapper"] { border-radius: var(--zen-node-radius) !important; }
html[${ATTR}] [data-testid="node-inner-wrapper"]::before { border-radius: inherit !important; }
html[${ATTR}] .lg-node > .pointer-events-none.absolute.border.border-solid.border-component-node-border { border-radius: var(--zen-node-radius) !important; }
html[${ATTR}] .lg-node-header {
  background: var(--node-component-header-surface, var(--component-node-background, var(--card))) !important;
  color: var(--node-component-slot-text, var(--foreground)) !important;
  border-color: var(--component-node-border, var(--border)) !important;
  border-radius: var(--zen-node-radius) var(--zen-node-radius) 0 0 !important;
}
html[${ATTR}] .lg-node > [data-testid^="node-body-"] {
  background: var(--component-node-background, var(--card, var(--background))) !important;
  border-radius: 0 0 var(--zen-node-radius) var(--zen-node-radius) !important;
}
/* Node bottom-edge elements hardcode their bottom radius — pin them to our node radius. */
html[${ATTR}] .lg-node .rounded-b-2xl,
html[${ATTR}] [data-testid="node-inner-wrapper"] .rounded-b-2xl,
html[${ATTR}] .lg-node .rounded-b-\\[20px\\],
html[${ATTR}] [data-testid="node-inner-wrapper"] .rounded-b-\\[20px\\],
html[${ATTR}] .lg-node .bg-destructive-background,
html[${ATTR}] [data-testid="node-inner-wrapper"] .bg-destructive-background {
  border-bottom-left-radius: var(--zen-node-radius) !important;
  border-bottom-right-radius: var(--zen-node-radius) !important;
}
/* A folded/collapsed node is header-only, so the header's bottom must round too. */
html[${ATTR}] .lg-node.collapsed .lg-node-header,
html[${ATTR}] .lg-node[data-collapsed="true"] .lg-node-header,
html[${ATTR}] .lg-node:not(:has([data-testid^="node-body-"])) .lg-node-header {
  border-radius: var(--zen-node-radius) !important;
}
html[${ATTR}] [data-testid="node-state-outline-overlay"] {
  border-color: var(--primary-background, var(--primary)) !important;
  border-radius: calc(var(--zen-node-radius) + 3px) !important;
}
html[${ATTR}] .text-node-component-slot-text,
html[${ATTR}] .node-title,
html[${ATTR}] .comfy-menu button,
html[${ATTR}] .comfy-menu label {
  color: var(--node-component-slot-text, var(--foreground)) !important;
}
html[${ATTR}] .p-button.p-button-primary,
html[${ATTR}] .p-splitbutton .p-button-primary {
  background: var(--p-button-primary-background, var(--primary-background, var(--primary))) !important;
  border-color: var(--p-button-primary-border-color, var(--primary-background, var(--primary))) !important;
  color: var(--p-button-primary-color, var(--primary-foreground, var(--foreground))) !important;
}
html[${ATTR}] .p-button.p-button-primary:hover,
html[${ATTR}] .p-splitbutton .p-button-primary:hover {
  background: var(--p-button-primary-hover-background, var(--primary-background-hover, var(--primary))) !important;
  border-color: var(--p-button-primary-hover-border-color, var(--primary-background-hover, var(--primary))) !important;
}
html[${ATTR}] .p-togglebutton,
html[${ATTR}] .p-togglebutton .p-togglebutton-content { color: var(--p-togglebutton-color, var(--foreground)) !important; }
html[${ATTR}] .p-togglebutton.p-togglebutton-checked,
html[${ATTR}] .p-togglebutton.p-togglebutton-checked:hover {
  background: var(--p-togglebutton-checked-background, var(--primary-background-hover, var(--accent, var(--primary)))) !important;
  border-color: var(--p-togglebutton-checked-border-color, var(--primary-background-hover, var(--accent, var(--primary)))) !important;
}
/* The checked toggle sits on the accent — its label AND icon must contrast THAT. */
html[${ATTR}] .p-togglebutton.p-togglebutton-checked,
html[${ATTR}] .p-togglebutton.p-togglebutton-checked * {
  color: var(--accent-foreground, var(--primary-foreground, var(--foreground))) !important;
  fill: var(--accent-foreground, var(--primary-foreground, var(--foreground))) !important;
}
html[${ATTR}] .p-inputtext,
html[${ATTR}] .p-select,
html[${ATTR}] .p-inputnumber-input {
  background: var(--p-form-field-background, var(--input-surface, var(--input))) !important;
  border-color: var(--p-form-field-border-color, var(--border)) !important;
  color: var(--p-form-field-color, var(--foreground)) !important;
}
/* Pin every Nodes-2.0 inline widget control (and its value text) to the readable node
   foreground the multiline textarea already uses, so values don't render ~white on a light
   theme. Field <label>s keep their muted colour, preserving the name/value hierarchy. */
html[${ATTR}] [data-testid^="widget-"],
html[${ATTR}] [data-testid^="widget-"] *,
html[${ATTR}] [data-testid$="-trigger"][role="combobox"],
html[${ATTR}] [data-testid$="-trigger"][role="combobox"] *,
html[${ATTR}] .lg-node input,
html[${ATTR}] .lg-node select,
html[${ATTR}] [data-testid="node-inner-wrapper"] input,
html[${ATTR}] [data-testid="node-inner-wrapper"] select {
  color: var(--component-node-foreground, var(--foreground)) !important;
}
html[${ATTR}] .litegraph-minimap { border-radius: var(--radius, 10px) !important; overflow: hidden !important; }
/* Pin PrimeVue / ComfyUI overlay menus to the theme radius (they keep a fixed one otherwise). */
html[${ATTR}] {
  --p-border-radius-md: var(--zen-radius, 10px);
  --p-border-radius-lg: var(--zen-radius, 10px);
  --p-border-radius-xl: var(--zen-radius, 10px);
}
html[${ATTR}] .p-tieredmenu,
html[${ATTR}] .p-tieredmenu-overlay,
html[${ATTR}] .p-menu,
html[${ATTR}] .p-menu-overlay,
html[${ATTR}] .p-contextmenu,
html[${ATTR}] .p-popover,
html[${ATTR}] .p-overlaypanel,
html[${ATTR}] .p-select-overlay,
html[${ATTR}] .p-autocomplete-overlay,
html[${ATTR}] .p-multiselect-overlay,
html[${ATTR}] .comfy-command-menu { border-radius: var(--zen-radius, 10px) !important; }
html[${ATTR}] [data-testid="queue-inline-progress"],
html[${ATTR}] [data-testid="queue-inline-progress"] * { border-radius: var(--zen-radius, 7px) !important; }
/* Replace the ComfyUI tree-row hover (bg-comfy-input, unreliable contrast) with a subtle tint. */
html[${ATTR}] [class~="group/tree-node"]:hover,
html[${ATTR}] .p-tree-node-content:hover,
html[${ATTR}] .p-tree-node-selectable:not(.p-tree-node-selected):hover {
  background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent) !important;
  color: var(--zen-text, var(--foreground)) !important;
}
/* Selected sidebar tab surface is a subtle elevation, not the accent — colour its icon+label
   with the accent (readable highlight), excluding the count badge so its number stays visible. */
html[${ATTR}] .side-bar-button-selected,
html[${ATTR}] .side-bar-button-selected *:not(.sidebar-icon-badge):not(.sidebar-icon-badge *) {
  color: var(--primary, var(--accent, var(--foreground))) !important;
}
/* A genuinely accent-FILLED highlight (PrimeVue p-highlight) does need contrast text. */
html[${ATTR}] .side-tool-bar-container .p-button.p-highlight,
html[${ATTR}] .side-tool-bar-container .p-button.p-highlight * {
  color: var(--primary-foreground, var(--foreground)) !important;
}
/* The drag-select marquee (Nodes 2.0) is a Tailwind blue box — recolour to the accent. */
html[${ATTR}] .z-9999.border-blue-400 {
  border-color: var(--zen-accent, var(--primary, #3b82f6)) !important;
  background: color-mix(in srgb, var(--zen-accent, var(--primary, #3b82f6)) 18%, transparent) !important;
  border-radius: var(--radius, 8px) !important;
}
/* Minimap viewport indicator (the "view cone") is white by default — use the accent. */
html[${ATTR}] .minimap-viewport {
  border-color: var(--zen-accent, var(--primary, #3b82f6)) !important;
  outline-color: var(--zen-accent, var(--primary, #3b82f6)) !important;
  background: color-mix(in srgb, var(--zen-accent, var(--primary, #3b82f6)) 14%, transparent) !important;
}
`

// Pack tokens go in ONE <style> with !important (beats ComfyUI's inline vars). We never write
// ComfyUI's vars inline, so emptying this style (the 'comfy' pack) restores them untouched.
// Target BOTH html and body: ComfyUI sets vars inline on <body>, and custom props resolve from
// the nearest ancestor, so a body-level definition would shadow an html-only one for nodes.
function tokenCss(map: Record<string, string>): string {
  let body = ''
  for (const k of Object.keys(map)) body += `${k}:${map[k]} !important;`
  return `html[${ATTR}],body[${ATTR}]{${body}}`
}

/* ── structured region targeting ──────────────────────────────────────────────── */
// Friendly region name → the ComfyUI selector it styles. Curated + stable: if ComfyUI renames a
// class, it's fixed here once, not in every theme. Rules are scoped to the active pack, so a
// theme's region styling never leaks into another.
const REGION_SELECTORS: Record<string, string> = {
  sideToolbar: '.side-tool-bar-container',
  topBar: '.comfyui-body-top',
  bottomBar: '.comfyui-body-bottom',
  menuBar: '.comfy-menu',
  nodeHeader: '.lg-node-header',
  node: '.lg-node',
  minimap: '.litegraph-minimap',
}

// A bare-filename `url(foo.svg)` ref → the theme's own asset route, so a pack can ship pattern /
// border images beside its JSON (served by nodes/theme/api.py). Absolute / data: / http refs are
// left untouched.
function resolveAssetUrls(value: string, id: string): string {
  return value.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (m, _q, ref) => {
    const r = String(ref).trim()
    if (!r || r.includes('/') || r.startsWith('data:') || r.startsWith('http')) return m
    return `url('/nynxz/experimental/theme_asset?id=${encodeURIComponent(id)}&file=${encodeURIComponent(r)}')`
  })
}

function buildRegionCss(pack: ThemePack): string {
  if (!pack.regions) return ''
  let out = ''
  for (const [region, style] of Object.entries(pack.regions)) {
    const sel = REGION_SELECTORS[region]
    if (!sel) continue // unknown region name — skip rather than emit a broken selector
    let decls = ''
    for (const [prop, value] of Object.entries(style)) {
      decls += `${prop}:${resolveAssetUrls(value, pack.id)} !important;`
    }
    if (decls) out += `html[${ATTR}="${pack.id}"] ${sel},body[${ATTR}="${pack.id}"] ${sel}{${decls}}`
  }
  return out
}

let bridgeReady = false
const roots = (): HTMLElement[] => [document.documentElement, document.body]

/** Apply a pack for a mode. `id === 'comfy'` (or an unknown id) clears all overrides so
 *  ComfyUI owns its vars again. The bridge <style> is injected once, on first apply. */
export function applyTheme(id: string, mode: ThemeMode): void {
  if (!bridgeReady) {
    ensureStyle('nynxz-theme-bridge', BRIDGE_RULES)
    bridgeReady = true
  }
  const pack = id === 'comfy' ? null : registry.get(id)
  if (!pack) {
    ensureStyle('nynxz-theme-tokens', '') // no overrides; ComfyUI owns its vars
    ensureStyle('nynxz-theme-css', '') // and no pack custom CSS
    ensureStyle('nynxz-theme-regions', '') // and no region styling
    for (const el of roots()) el.removeAttribute(ATTR)
    return
  }
  const resolved = resolveThemeTokens(pack, mode)
  const r = resolved['--radius']
  ensureStyle(
    'nynxz-theme-tokens',
    tokenCss({ ...jobProgressDefaults(resolved), ...resolved, ...zenDerived(resolved), ...(r ? radiusScale(r) : {}) }),
  )
  // The active pack's custom CSS, injected verbatim AFTER the tokens so it cascades over them,
  // and cleared the moment another pack (or a css-less one) takes over.
  ensureStyle('nynxz-theme-css', pack.css || '')
  // Structured region styling (side-toolbar borders/patterns, etc.), scoped to this pack.
  ensureStyle('nynxz-theme-regions', buildRegionCss(pack))
  for (const el of roots()) el.setAttribute(ATTR, id)
}
