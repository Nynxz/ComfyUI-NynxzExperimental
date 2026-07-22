<!--
  Per-source strength / fit / mute for Fusion Images — one row per connected IMAGE socket.

  The grid node (FusionGrid.vue) owns files on disk and can show a real thumbnail per card.
  This is the wire-side equivalent: the images arrive on sockets, so there's nothing to
  preview, but everything else about a source is the same — a relative strength, a fit, a
  mute, and the live % share of the fused result it claims.

  Rows are positional: row i drives the i-th *connected* IMAGE input, matching
  `group_images()` on the backend, which likewise skips unconnected sockets. This lives in a
  widget rather than on the sockets because an autogrow template takes exactly one input per
  repeat, so `image_N` can't carry its own strength field.
-->
<template>
  <div class="fs-root">
    <div v-if="count" class="fs-rows">
      <div v-for="i in count" :key="i - 1" class="fs-row" :class="{ off: !enabledAt(i - 1) }">
        <button
          class="fs-act"
          :title="enabledAt(i - 1) ? 'Mute this image' : 'Unmute this image'"
          @click.stop="toggleOn(i - 1)"
        >
          <i class="mdi" :class="enabledAt(i - 1) ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" />
        </button>

        <span class="fs-label" :title="labels[i - 1]">{{ labels[i - 1] }}</span>

        <button
          class="fs-act"
          :title="FIT_META[fitAt(i - 1)].label + ' (click to change)'"
          @click.stop="cycleFit(i - 1)"
        >
          <i class="mdi" :class="FIT_META[fitAt(i - 1)].icon" />
        </button>

        <ZenSlider
          class="fs-slider"
          :model-value="strengthAt(i - 1)"
          :min="0"
          :max="2"
          :step="0.05"
          :disabled="!enabledAt(i - 1)"
          @update:model-value="setStrength(i - 1, $event)"
        />
        <ZenNumber
          class="fs-num"
          bare
          :model-value="strengthAt(i - 1)"
          :min="0"
          :max="10"
          :step="0.05"
          :disabled="!enabledAt(i - 1)"
          @update:model-value="setStrength(i - 1, $event)"
        />

        <span class="fs-pct" :class="{ dim: !enabledAt(i - 1) }">{{
          enabledAt(i - 1) ? Math.round(share(i - 1)) + '%' : 'muted'
        }}</span>

        <!-- the live claim this source has on the fused result, mirroring the grid's cards -->
        <span class="fs-share" :style="{ width: share(i - 1) + '%' }" />
      </div>
    </div>

    <div v-else class="fs-empty">
      <i class="mdi mdi-transit-connection-variant" />
      <span>Wire an IMAGE in</span>
      <small>One is enough — more will blend</small>
    </div>

    <!-- one image is a legal fusion (the blend is a passthrough), so this only fires on zero -->
    <div v-if="count && !enabledCount" class="fs-warn">
      <i class="mdi mdi-alert-outline" />
      <span>Every image is muted — fusion needs at least one</span>
    </div>

    <div v-if="count" class="fs-bar">
      <ZenIconButton
        icon="mdi mdi-scale-balance"
        title="Reset every strength to 1.0"
        @click="balance"
      />
      <span class="fs-hint">Strength is relative — doubling every row changes nothing</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ZenSlider, ZenNumber, ZenIconButton } from '@zenkit/ui'

type FitMode = 'cover' | 'contain' | 'stretch'
const FITS: FitMode[] = ['contain', 'cover', 'stretch']
const DEFAULT_FIT: FitMode = 'contain'

// Same three framings, icons and wording as the grid's cards — the two collectors should read
// as one family.
const FIT_META: Record<FitMode, { icon: string; label: string }> = {
  contain: { icon: 'mdi-fit-to-page-outline', label: 'Contain — whole image, letterboxed' },
  cover: { icon: 'mdi-crop', label: 'Cover — center-crop to fill' },
  stretch: { icon: 'mdi-arrow-expand-all', label: 'Stretch — distort to fill' },
}

interface RowsValue {
  strengths: number[]
  fits: FitMode[]
  enabled: boolean[]
}
interface DOMWidget {
  value: unknown
  callback?: (v: unknown) => void
}
interface LGInput {
  type?: string
  link?: number | null
}
interface LGNode {
  inputs?: LGInput[]
  graph?: {
    setDirtyCanvas?: (a: boolean, b: boolean) => void
    links?: Record<number, { origin_id?: number } | undefined>
    getNodeById?: (id: number) => { title?: string; type?: string } | null
  }
  onConnectionsChange?: (...args: unknown[]) => void
}

const props = defineProps<{ widget?: DOMWidget; node?: LGNode }>()

function safeJson(s: string): unknown {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}
function num(v: unknown, fallback: number) {
  const n = +(v as number)
  return Number.isFinite(n) ? n : fallback
}
function parse(v: unknown): RowsValue {
  const o = (typeof v === 'string' ? safeJson(v) : v) as Partial<RowsValue> | null
  return {
    strengths: Array.isArray(o?.strengths) ? o!.strengths.map((s) => Math.max(0, num(s, 1))) : [],
    fits: Array.isArray(o?.fits) ? o!.fits.map((f) => (FITS.includes(f) ? f : DEFAULT_FIT)) : [],
    enabled: Array.isArray(o?.enabled) ? o!.enabled.map((e) => e !== false) : [],
  }
}

const init = parse(props.widget?.value)
const strengths = ref<number[]>(init.strengths)
const fits = ref<FitMode[]>(init.fits)
const enabled = ref<boolean[]>(init.enabled)
const count = ref<number>(0)
const labels = ref<string[]>([])

// Anything the stored arrays are short on reads as a plain enabled 1.0/contain source, so a
// newly wired socket joins the blend at full strength instead of vanishing.
const strengthAt = (i: number) => (i < strengths.value.length ? strengths.value[i] : 1)
const fitAt = (i: number): FitMode => (i < fits.value.length ? fits.value[i] : DEFAULT_FIT)
const enabledAt = (i: number) => (i < enabled.value.length ? enabled.value[i] : true)

const enabledCount = computed(() => {
  let n = 0
  for (let i = 0; i < count.value; i++) if (enabledAt(i)) n++
  return n
})
const totalStrength = computed(() => {
  let total = 0
  for (let i = 0; i < count.value; i++) if (enabledAt(i)) total += strengthAt(i)
  return total
})
/** Each source's actual claim on the fused result — strength is relative, so this is what a
 *  given row really buys you once the others are in the mix. */
function share(i: number): number {
  if (!enabledAt(i)) return 0
  const total = totalStrength.value
  return total > 0 ? (strengthAt(i) / total) * 100 : 0
}

/** Grow an array to `count`, filling with the same defaults the getters assume. */
function widen<T>(list: T[], fill: (i: number) => T): T[] {
  const next = list.slice(0, count.value)
  while (next.length < count.value) next.push(fill(next.length))
  return next
}

function commit() {
  if (props.widget) {
    const snapshot: RowsValue = {
      strengths: widen(strengths.value, () => 1),
      fits: widen(fits.value, () => DEFAULT_FIT),
      enabled: widen(enabled.value, () => true),
    }
    // Writing the DOM widget value is how these rows serialize with the graph.
    // eslint-disable-next-line vue/no-mutating-props
    props.widget.value = snapshot
    try {
      props.widget.callback?.(snapshot)
    } catch {
      /* no callback */
    }
  }
  props.node?.graph?.setDirtyCanvas?.(true, true)
}

function setStrength(i: number, v: number) {
  const next = widen(strengths.value, () => 1)
  next[i] = Math.max(0, num(v, 1))
  strengths.value = next
  commit()
}
function cycleFit(i: number) {
  const next = widen(fits.value, () => DEFAULT_FIT)
  next[i] = FITS[(FITS.indexOf(next[i]) + 1) % FITS.length]
  fits.value = next
  commit()
}
function toggleOn(i: number) {
  const next = widen(enabled.value, () => true)
  next[i] = !next[i]
  enabled.value = next
  commit()
}
function balance() {
  strengths.value = Array.from({ length: count.value }, () => 1)
  commit()
}

// --- source discovery: one row per connected IMAGE input, in socket order ---
function imageInputs(): LGInput[] {
  return (props.node?.inputs ?? []).filter(
    (inp) => (inp.type ?? '').toUpperCase() === 'IMAGE' && inp.link != null,
  )
}
function sourceLabel(inp: LGInput, idx: number): string {
  try {
    const link = inp.link != null ? props.node?.graph?.links?.[inp.link] : undefined
    const origin = link?.origin_id != null ? props.node?.graph?.getNodeById?.(link.origin_id) : null
    const title = origin?.title || origin?.type
    if (title) return String(title).replace(/^.*\./, '').slice(0, 22)
  } catch {
    /* graph not ready */
  }
  return `Image ${idx + 1}`
}
function sync() {
  const inputs = imageInputs()
  count.value = inputs.length
  labels.value = inputs.map(sourceLabel)
}

onMounted(() => {
  sync()
  const node = props.node
  if (node) {
    const prev = node.onConnectionsChange
    node.onConnectionsChange = function (this: unknown, ...args: unknown[]) {
      try {
        prev?.apply(this, args)
      } finally {
        queueMicrotask(sync)
      }
    }
  }
  // The graph isn't fully linked on mount when a saved workflow loads, so re-read a few times.
  ;[0, 80, 300, 800].forEach((t) => window.setTimeout(sync, t))
})
</script>

<style scoped>
.fs-root {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 2px 0;
}

.fs-rows {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.fs-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 6px 5px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--zen-text, #fff) 3%, transparent);
}
.fs-row.off {
  opacity: 0.55;
}

.fs-act {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--zen-muted, #9aa0aa);
  font-size: 14px;
  cursor: pointer;
}
.fs-act:hover {
  background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent);
  color: var(--zen-text, #fff);
}

.fs-label {
  flex: 1;
  min-width: 0;
  font-size: 10px;
  color: var(--zen-text, #e6e6e6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fs-slider {
  flex: 2;
  min-width: 60px;
}
.fs-num {
  flex: none;
  width: 46px;
}

.fs-pct {
  flex: none;
  width: 30px;
  text-align: right;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--zen-text, #fff);
}
.fs-pct.dim {
  font-weight: 500;
  color: var(--zen-muted, #9aa0aa);
}

/* the live share of the blend this source claims */
.fs-share {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  border-radius: 0 0 5px 5px;
  background: var(--zen-accent, #6366f1);
  transition: width 0.12s ease;
  pointer-events: none;
}

.fs-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 14px 8px;
  color: var(--zen-muted, #9aa0aa);
  text-align: center;
}
.fs-empty i {
  font-size: 22px;
  opacity: 0.7;
}
.fs-empty span {
  font-size: 11px;
}
.fs-empty small {
  font-size: 9.5px;
  opacity: 0.75;
}

.fs-warn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 6px;
  border-radius: 5px;
  background: color-mix(in srgb, #e0a33a 14%, transparent);
  color: #e0a33a;
  font-size: 10px;
}

.fs-bar {
  display: flex;
  align-items: center;
  gap: 6px;
}
.fs-hint {
  flex: 1;
  min-width: 0;
  font-size: 9px;
  color: var(--zen-muted, #9aa0aa);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
