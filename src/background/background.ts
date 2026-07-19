// Interactive WebGL2 grid behind the node graph. A <canvas> is inserted behind LiteGraph's
// (whose own background is suppressed); a RAF loop drives it, synced to the graph's pan/zoom,
// with colors pulled from the active theme tokens. Toggled by a ComfyUI setting (see register.ts).
//
// Ported from the ZenKit core (packages/core/src/background.ts) — Nynxz's own MIT project — with
// the types inlined and the persistence moved onto the ComfyUI settings API instead of localStorage.
import { app } from '@comfy/app'

/** Per-frame drawing context handed to a background's `frame()` (inlined from @zenkit/types). */
interface BackgroundContext {
  layer: HTMLCanvasElement
  w: number
  h: number
  dpr: number
  scale: number
  offset: { x: number; y: number }
  mouse: { x: number; y: number; over: boolean }
  time: number
  dt: number
  color(cssVar: string, fallback?: string): string
}

/** A canvas background rendered behind the node graph (inlined from @zenkit/types). */
interface ZenBackground {
  id: string
  label: string
  init?(ctx: BackgroundContext): unknown
  frame(ctx: BackgroundContext, state: unknown): void
  dispose?(state: unknown): void
}

// The LiteGraph canvas bits this touches. `app.canvas` is strictly typed as LGraphCanvas, but we
// reach a couple of internal fields (_pattern/_bg_img) too, so go through this loose view.
interface LGCanvas {
  canvas: HTMLCanvasElement
  ds?: { scale?: number; offset?: number[] }
  background_image?: unknown
  clear_background_color?: unknown
  _pattern?: unknown
  _bg_img?: unknown
  setDirty?: (a: boolean, b?: boolean) => void
}
function lgCanvas(): LGCanvas | null {
  return (app.canvas as unknown as LGCanvas | null) ?? null
}

/* ── color resolution (packs emit oklch, which canvas can't parse) ──────────── */
function oklToRgb(str: string): [number, number, number] | null {
  const num = (t: string) => (t && t.indexOf('%') >= 0 ? parseFloat(t) / 100 : parseFloat(t))
  let L: number, a: number, b: number
  let m = /oklch\(\s*([^)]+)\)/i.exec(str)
  if (m) {
    const p = m[1]!.split('/')[0]!.trim().split(/[\s,]+/)
    L = num(p[0]!)
    const C = parseFloat(p[1]!)
    const H = ((parseFloat(p[2]!) || 0) * Math.PI) / 180
    a = C * Math.cos(H)
    b = C * Math.sin(H)
  } else if ((m = /oklab\(\s*([^)]+)\)/i.exec(str))) {
    const p = m[1]!.split('/')[0]!.trim().split(/[\s,]+/)
    L = num(p[0]!)
    a = parseFloat(p[1]!)
    b = parseFloat(p[2]!)
  } else {
    return null
  }
  if ([L, a, b].some(Number.isNaN)) return null
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ ** 3,
    mm = m_ ** 3,
    s = s_ ** 3
  const lin = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
  ]
  const g = (x: number) => {
    const c = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055
    return Math.max(0, Math.min(255, Math.round(c * 255)))
  }
  return [g(lin[0]!), g(lin[1]!), g(lin[2]!)]
}

const probe2d = (() => {
  try {
    return document.createElement('canvas').getContext('2d')
  } catch {
    return null
  }
})()

function normalizeColor(value: string): string {
  const v = (value || '').trim()
  if (!v) return ''
  if (v[0] === '#' || v.startsWith('rgb')) return v
  if (v.startsWith('okl')) {
    const rgb = oklToRgb(v)
    if (rgb) return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }
  if (probe2d) {
    probe2d.fillStyle = '#000000'
    probe2d.fillStyle = v
    const a = probe2d.fillStyle
    probe2d.fillStyle = '#ffffff'
    probe2d.fillStyle = v
    if (a === probe2d.fillStyle) return a as string
  }
  return ''
}

function cssColor(name: string, fallback: string): string {
  const el = document.querySelector('.comfyui-body-top') || document.body
  const raw = getComputedStyle(el as Element).getPropertyValue(name)
  return normalizeColor(raw) || fallback
}

function hexToRgb(color: string): [number, number, number] | null {
  if (!color) return null
  const s = String(color).trim()
  if (s[0] === '#') {
    let h = s.slice(1)
    if (h.length === 3) h = h[0]! + h[0]! + h[1]! + h[1]! + h[2]! + h[2]!
    if (h.length !== 6) return null
    const n = parseInt(h, 16)
    if (Number.isNaN(n)) return null
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }
  const m = s.match(/rgba?\(([^)]+)\)/i)
  if (m) {
    const p = m[1]!.split(/[\s,/]+/).filter(Boolean).map(parseFloat)
    if (p.length >= 3 && p.slice(0, 3).every((x) => !Number.isNaN(x))) return [Math.round(p[0]!), Math.round(p[1]!), Math.round(p[2]!)]
  }
  return null
}

/* ── the interactive grid (WebGL2 shader; baked-in defaults) ────────────────── */
const S = {
  rainbow: 1, // drifting full-field spectrum (the original look)
  colorSpeed: 45, // °/sec
  dotSpacing: 32, // graph units
  dotRadius: 1.4,
  restAlpha: 0.22,
  glowSize: 8,
  mouseRadius: 200,
  baseBrightness: 0.25,
  saturation: 0.7,
  lightness: 0.55,
  vignette: 1,
}

const VERT = `#version 300 es
const vec2 V[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main(){ gl_Position = vec4(V[gl_VertexID], 0.0, 1.0); }
`

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2  u_res;
uniform float u_dpr;
uniform float u_scale;
uniform vec2  u_offset;
uniform vec2  u_mouse;
uniform float u_over;
uniform float u_time;
uniform float u_spacing;
uniform float u_dotRadius;
uniform float u_restAlpha;
uniform float u_glow;
uniform float u_mouseRadius;
uniform float u_sat;
uniform float u_lit;
uniform float u_base;
uniform float u_speed;
uniform float u_rainbow;
uniform vec3  u_dotColor;
uniform vec3  u_bgColor;
uniform float u_vignette;
vec3 hsl2rgb(float h, float s, float l){
  h = mod(h, 360.0) / 60.0;
  float c = (1.0 - abs(2.0*l - 1.0)) * s;
  float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
  vec3 rgb;
  if (h < 1.0)      rgb = vec3(c, x, 0.0);
  else if (h < 2.0) rgb = vec3(x, c, 0.0);
  else if (h < 3.0) rgb = vec3(0.0, c, x);
  else if (h < 4.0) rgb = vec3(0.0, x, c);
  else if (h < 5.0) rgb = vec3(x, 0.0, c);
  else              rgb = vec3(c, 0.0, x);
  return rgb + (l - c/2.0);
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  vec2 dev = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 g = dev / (u_dpr * u_scale) - u_offset;
  vec3 col = u_bgColor;
  vec2 baseCell = floor(g / u_spacing + 0.5);
  float aa = max(fwidth(g.x), fwidth(g.y)) + 0.001;
  for (int oy = -1; oy <= 1; oy++) {
    for (int ox = -1; ox <= 1; ox++) {
      vec2 cell = baseCell + vec2(float(ox), float(oy));
      vec2 dotPos = cell * u_spacing;
      float dist = length(g - dotPos);
      float prox = u_over > 0.5 ? max(0.0, 1.0 - length(dotPos - u_mouse) / u_mouseRadius) : 0.0;
      float h = hash(cell);
      float pulse = sin(u_time * (0.2 + h * 0.4) + h * 6.2831) * 0.5 + 0.5;
      float baseAlpha = u_restAlpha + h * 0.08;
      float alpha = baseAlpha + prox * 0.75 + pulse * 0.06;
      vec3 dotc;
      if (u_rainbow > 0.5) {
        float flow = (dotPos.x + dotPos.y) * 0.12
                   + 30.0 * sin(dotPos.x * 0.008 + u_time * 0.4)
                   + 30.0 * sin(dotPos.y * 0.010 - u_time * 0.3)
                   + u_time * u_speed;
        float hue = flow + prox * 50.0;
        float sat = u_base * 0.3 + prox * u_sat;
        float lit = u_base + prox * (u_lit - u_base);
        dotc = hsl2rgb(hue, sat, lit);
      } else {
        dotc = min(vec3(1.0), u_dotColor * (1.0 + prox * 0.7));
      }
      float coreR = u_dotRadius + prox * u_dotRadius * 1.8;
      float core = (1.0 - smoothstep(coreR - aa, coreR + aa, dist)) * alpha;
      float glowR = u_dotRadius + prox * u_glow;
      float glow = prox > 0.05 ? (1.0 - smoothstep(0.0, glowR, dist)) * prox * 0.4 * alpha : 0.0;
      col = mix(col, dotc, clamp(core + glow, 0.0, 1.0));
    }
  }
  if (u_vignette > 0.5) {
    vec2 uv = dev / u_res;
    float d = distance(uv, vec2(0.5, 0.4));
    col = mix(col, u_bgColor, smoothstep(0.55, 1.05, d));
  }
  fragColor = vec4(col, 1.0);
}
`

const UNIFORMS = [
  'u_res', 'u_dpr', 'u_scale', 'u_offset', 'u_mouse', 'u_over', 'u_time', 'u_spacing', 'u_dotRadius', 'u_restAlpha',
  'u_glow', 'u_mouseRadius', 'u_sat', 'u_lit', 'u_base', 'u_speed', 'u_rainbow', 'u_dotColor', 'u_bgColor', 'u_vignette',
] as const

type GLState = { gl: WebGL2RenderingContext; prog: WebGLProgram; u: Record<string, WebGLUniformLocation | null> }
type GridState = { gl: GLState | null; ctx2d: CanvasRenderingContext2D | null }

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('[ZenKit] bg shader compile failed:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function createGL(canvas: HTMLCanvasElement): GLState | null {
  const gl = canvas.getContext('webgl2', { alpha: false, premultipliedAlpha: false, antialias: false })
  if (!gl) return null
  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const prog = gl.createProgram()!
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('[ZenKit] bg program link failed:', gl.getProgramInfoLog(prog))
    return null
  }
  gl.useProgram(prog)
  const u: Record<string, WebGLUniformLocation | null> = {}
  for (const name of UNIFORMS) u[name] = gl.getUniformLocation(prog, name)
  return { gl, prog, u }
}

function renderGL(host: BackgroundContext, st: GLState) {
  const vw = host.w | 0
  const vh = host.h | 0
  if (vw <= 0 || vh <= 0) return
  const { gl, u } = st
  gl.useProgram(st.prog)
  gl.viewport(0, 0, vw, vh)
  const bg = (hexToRgb(host.color('--zen-bg', '#121212')) ?? [18, 18, 18]).map((v) => v / 255)
  const dot = (hexToRgb(host.color('--zen-text', '#cccccc')) ?? [200, 200, 200]).map((v) => v / 255)
  gl.uniform2f(u.u_res!, vw, vh)
  gl.uniform1f(u.u_dpr!, host.dpr)
  gl.uniform1f(u.u_scale!, host.scale)
  gl.uniform2f(u.u_offset!, host.offset.x, host.offset.y)
  gl.uniform2f(u.u_mouse!, host.mouse.x, host.mouse.y)
  gl.uniform1f(u.u_over!, host.mouse.over ? 1 : 0)
  gl.uniform1f(u.u_time!, host.time * 0.001)
  gl.uniform1f(u.u_spacing!, S.dotSpacing)
  gl.uniform1f(u.u_dotRadius!, S.dotRadius)
  gl.uniform1f(u.u_restAlpha!, S.restAlpha)
  gl.uniform1f(u.u_glow!, S.glowSize)
  gl.uniform1f(u.u_mouseRadius!, S.mouseRadius)
  gl.uniform1f(u.u_sat!, S.saturation)
  gl.uniform1f(u.u_lit!, S.lightness)
  gl.uniform1f(u.u_base!, S.baseBrightness)
  gl.uniform1f(u.u_speed!, S.colorSpeed)
  gl.uniform1f(u.u_rainbow!, S.rainbow)
  gl.uniform3f(u.u_dotColor!, dot[0]!, dot[1]!, dot[2]!)
  gl.uniform3f(u.u_bgColor!, bg[0]!, bg[1]!, bg[2]!)
  gl.uniform1f(u.u_vignette!, S.vignette)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function render2D(host: BackgroundContext, st: GridState) {
  const ctx = st.ctx2d || (st.ctx2d = host.layer.getContext('2d'))
  if (!ctx) return
  const W = host.w,
    H = host.h
  if (W <= 0 || H <= 0) return
  const k = host.dpr * host.scale
  const ox = host.offset.x,
    oy = host.offset.y
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, W, H)
  ctx.setTransform(k, 0, 0, k, k * ox, k * oy)
  const ax = -ox,
    ay = -oy,
    aw = W / k,
    ah = H / k
  ctx.fillStyle = host.color('--zen-bg', '#121212')
  ctx.fillRect(ax, ay, aw, ah)
  const dotCol = hexToRgb(host.color('--zen-text', '#cccccc')) ?? [200, 200, 200]
  const t = host.time * 0.001
  const i0 = Math.floor(ax / S.dotSpacing) - 1,
    i1 = Math.ceil((ax + aw) / S.dotSpacing) + 1
  const j0 = Math.floor(ay / S.dotSpacing) - 1,
    j1 = Math.ceil((ay + ah) / S.dotSpacing) + 1
  for (let j = j0; j <= j1; j++) {
    for (let i = i0; i <= i1; i++) {
      const x = i * S.dotSpacing,
        y = j * S.dotSpacing
      const prox = host.mouse.over ? Math.max(0, 1 - Math.hypot(x - host.mouse.x, y - host.mouse.y) / S.mouseRadius) : 0
      const r = dotCol[0] * (1 + prox * 0.7),
        g = dotCol[1] * (1 + prox * 0.7),
        b = dotCol[2] * (1 + prox * 0.7)
      const alpha = S.restAlpha + prox * 0.75
      ctx.beginPath()
      ctx.arc(x, y, S.dotRadius + prox * S.dotRadius * 1.8, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${Math.min(255, r) | 0}, ${Math.min(255, g) | 0}, ${Math.min(255, b) | 0}, ${Math.min(1, alpha)})`
      ctx.fill()
    }
  }
  void t
}

const grid: ZenBackground = {
  id: 'grid',
  label: 'Interactive Grid',
  init(host) {
    const gl = createGL(host.layer)
    if (!gl) console.warn('[ZenKit] WebGL2 unavailable — 2D fallback grid.')
    return { gl, ctx2d: null } as GridState
  },
  frame(host, state) {
    const st = state as GridState
    if (st.gl) renderGL(host, st.gl)
    else render2D(host, st)
  },
  dispose(state) {
    const st = state as GridState
    st.gl?.gl.getExtension('WEBGL_lose_context')?.loseContext()
  },
}

/* ── registry + host ───────────────────────────────────────────────────────── */
const registry = new Map<string, ZenBackground>()
registry.set(grid.id, grid)
let desiredId: string | null = 'grid'

class Host {
  private layer: HTMLCanvasElement | null = null
  private raf = 0
  private last = 0
  private active: ZenBackground | null = null
  private state: unknown = null
  private started = false
  private ptr = { x: 0, y: 0, over: false }
  private saved: { bg?: unknown; clear?: unknown } = {}

  mount() {
    if (this.started) return
    this.started = true
    const move = (e: PointerEvent) => {
      this.ptr.x = e.clientX
      this.ptr.y = e.clientY
      this.ptr.over = true
    }
    window.addEventListener('pointermove', move, { capture: true, passive: true })
    window.addEventListener('pointerleave', () => (this.ptr.over = false), true)
    window.addEventListener('resize', () => this.resize())
    this.whenReady()
  }

  private whenReady(tries = 0) {
    if (lgCanvas()?.canvas) return this.setActive(desiredId)
    if (tries > 120) return
    requestAnimationFrame(() => this.whenReady(tries + 1))
  }

  private makeLayer(lg: { canvas: HTMLCanvasElement }) {
    const el = lg.canvas
    const c = document.createElement('canvas')
    c.setAttribute('aria-hidden', 'true')
    c.dataset.zenkitBg = ''
    Object.assign(c.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' })
    el.parentElement?.insertBefore(c, el)
    this.layer = c
    this.resize()
  }

  private resize() {
    const el = lgCanvas()?.canvas
    const c = this.layer
    if (!el || !c) return
    if (c.width !== el.width || c.height !== el.height) {
      c.width = el.width
      c.height = el.height
    }
  }

  private suppress(lg: LGCanvas) {
    if (this.saved.clear === undefined) {
      this.saved.bg = lg.background_image
      this.saved.clear = lg.clear_background_color
    }
    lg.background_image = ''
    lg.clear_background_color = ''
    lg._pattern = undefined
    lg._bg_img = undefined
  }

  private restore(lg: LGCanvas) {
    if (this.saved.clear === undefined) return
    lg.background_image = this.saved.bg
    lg.clear_background_color = this.saved.clear
    lg._pattern = undefined
    lg._bg_img = undefined
    this.saved = {}
  }

  private buildCtx(lg: { canvas: HTMLCanvasElement; ds?: { scale?: number; offset?: number[] } }, now: number): BackgroundContext {
    const c = this.layer!
    const off = lg.ds?.offset || [0, 0]
    const scale = lg.ds?.scale ?? 1
    const r = lg.canvas.getBoundingClientRect()
    // Device pixels per CSS pixel for the graph canvas. We derive this from the canvas itself
    // (backing-store width ÷ CSS width) rather than reading window.devicePixelRatio, because
    // browser page zoom shifts devicePixelRatio independently of LiteGraph's backing store — so
    // trusting it drifts the grid out of scale/alignment with the nodes on zoom. c.width tracks
    // el.width (see resize()), so this is exactly the ratio LiteGraph rendered at, and it keeps
    // the shader's g = dev/(dpr*scale) - offset consistent with the CSS-space cursor mapping below.
    const dpr = r.width > 0 ? c.width / r.width : window.devicePixelRatio || 1
    let mx = -1e6,
      my = -1e6,
      over = false
    if (this.ptr.over && this.ptr.x >= r.left && this.ptr.x <= r.right && this.ptr.y >= r.top && this.ptr.y <= r.bottom) {
      over = true
      // graph-space cursor (matches the shader's g = dev/(dpr*scale) - offset)
      mx = (this.ptr.x - r.left) / scale - off[0]!
      my = (this.ptr.y - r.top) / scale - off[1]!
    }
    return {
      layer: c,
      w: c.width,
      h: c.height,
      dpr,
      scale,
      offset: { x: off[0]!, y: off[1]! },
      mouse: { x: mx, y: my, over },
      time: now,
      dt: this.last ? now - this.last : 16,
      color: (v, fb = '#888888') => cssColor(v, fb),
    }
  }

  setActive(id: string | null) {
    desiredId = id
    const targetId = id && id !== 'none' ? id : null
    if (this.active?.id === targetId) return
    const lg = lgCanvas()
    if (!lg || !lg.canvas) return

    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
    this.last = 0
    if (this.active) {
      try {
        this.active.dispose?.(this.state)
      } catch (e) {
        console.error('[ZenKit] background dispose failed', e)
      }
    }
    this.active = null
    this.state = null
    this.layer?.remove()
    this.layer = null

    const def = targetId ? registry.get(targetId) : undefined
    if (!def) {
      this.restore(lg)
      lg.setDirty?.(true, true)
      return
    }
    this.active = def
    this.makeLayer(lg)
    this.suppress(lg)
    try {
      this.state = def.init?.(this.buildCtx(lg, performance.now())) ?? {}
    } catch (e) {
      console.error('[ZenKit] background init failed', e)
      this.state = {}
    }
    lg.setDirty?.(true, true)
    const loop = (now: number) => {
      this.raf = requestAnimationFrame(loop)
      this.tick(now)
    }
    this.raf = requestAnimationFrame(loop)
  }

  private tick(now: number) {
    const lg = lgCanvas()
    if (!this.active || !this.layer || !lg) return
    this.resize()
    if (lg.clear_background_color || lg.background_image) {
      lg.background_image = ''
      lg.clear_background_color = ''
      lg._pattern = undefined
      lg._bg_img = undefined
      lg.setDirty?.(false, true)
    }
    const c = this.buildCtx(lg, now)
    this.last = now
    try {
      this.active.frame(c, this.state)
    } catch (e) {
      console.error('[ZenKit] background frame failed; disabling', e)
      this.setActive(null)
    }
  }
}

const host = new Host()
let mounted = false

/* ── public surface ─────────────────────────────────────────────────────────── */
/** Turn the interactive background on/off. Persistence lives in the ComfyUI setting that calls
 *  this (see register.ts), not here. Idempotent, and safe to call before the graph canvas
 *  exists — the host waits for it. The pointer/RAF machinery only mounts once it's first
 *  enabled, so leaving it off costs nothing. */
export function setBackgroundEnabled(on: boolean): void {
  desiredId = on ? 'grid' : null
  if (!mounted) {
    if (!on) return // never enabled — nothing to set up
    mounted = true
    host.mount() // whenReady() activates `desiredId` once app.canvas exists
  } else {
    host.setActive(desiredId)
  }
}
