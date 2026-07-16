<template>
  <div
    ref="root"
    class="fg"
    :class="{ dropping: dragOver }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div v-if="dragOver" class="fg-dropmask">
      <i class="mdi mdi-tray-arrow-down" /><span>Drop images to add</span>
    </div>

    <!-- the images take the node's spare height and scroll; the toolbar below stays put.
         data-capture-wheel + focus-on-hover is what stops the canvas from zooming when you
         wheel over the grid — see armScroll. -->
    <ZenScroll
      ref="scrollEl"
      class="fg-scroll"
      tabindex="-1"
      data-capture-wheel="true"
      @pointerenter="armScroll"
      @pointerleave="disarmScroll"
    >
      <div v-if="rows.length" class="fg-grid">
        <div
          v-for="(row, i) in rows"
          :key="row.id"
          class="fg-card"
          :class="{ off: !row.on, dragging: dragIndex === i, over: dropIndex === i && dragIndex !== i }"
          @dragover.prevent="onRowDragOver(i, $event)"
          @drop="onRowDrop(i, $event)"
          @dragend="endReorder"
        >
          <!-- only the thumb starts a reorder: a draggable card would swallow slider drags -->
          <div class="fg-thumb" draggable="true" @dragstart="startReorder(i, $event)">
            <!-- object-fit: contain, on black — the card shows exactly the letterboxed
                 frame the encoder is handed, bars and all -->
            <img
              v-if="!missing.has(row.ref)"
              :src="thumbUrl(row.ref, row.type)"
              loading="lazy"
              @error="onImgError(row)"
            />
            <i v-else class="mdi mdi-image-broken-variant fg-ph warn" title="This file is gone from the folder" />

            <span class="fg-idx" :title="`Source ${i + 1} — drag to reorder`">{{ i + 1 }}</span>

            <div class="fg-acts">
              <button class="fg-act" :title="row.on ? 'Mute this image' : 'Unmute this image'" @click.stop="toggleOn(i)">
                <i class="mdi" :class="row.on ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" />
              </button>
              <button class="fg-act danger" title="Remove" @click.stop="removeRow(i)">
                <i class="mdi mdi-close" />
              </button>
            </div>

            <span v-if="!row.on" class="fg-mutemark"><i class="mdi mdi-eye-off" /></span>
            <div class="fg-meta">
              <span class="fg-name" :title="row.ref">{{ shortName(row.ref) }}</span>
              <span class="fg-pct" :class="{ dim: !row.on }">{{ row.on ? Math.round(share(row)) + '%' : 'muted' }}</span>
            </div>
            <!-- how much of the fused result this image actually claims, live -->
            <span class="fg-share" :style="{ width: share(row) + '%' }" />
          </div>

          <div class="fg-foot">
            <ZenSlider
              class="fg-slider"
              :model-value="row.strength"
              :min="0"
              :max="2"
              :step="0.05"
              :disabled="!row.on"
              @update:model-value="setStrength(i, $event)"
            />
            <ZenNumber
              class="fg-num"
              bare
              :model-value="row.strength"
              :min="0"
              :max="10"
              :step="0.05"
              :disabled="!row.on"
              @update:model-value="setStrength(i, $event)"
            />
          </div>
        </div>
      </div>

      <div v-else class="fg-empty">
        <i class="mdi mdi-image-multiple-outline" />
        <span>Drop images here</span>
        <small>One is enough — more will blend</small>
      </div>
    </ZenScroll>

    <!-- one image is a legal fusion (the blend is a passthrough), so this only fires on zero -->
    <div v-if="rows.length && !enabledCount" class="fg-warn">
      <i class="mdi mdi-alert-outline" />
      <span>Every image is muted — fusion needs at least one</span>
    </div>

    <div class="fg-bar">
      <button class="fg-add" :disabled="busy" @click="triggerUpload">
        <i class="mdi" :class="busy ? 'mdi-loading mdi-spin' : 'mdi-plus'" />
        {{ busy ? 'Uploading…' : 'Add images' }}
        <span v-if="rows.length" class="fg-add-n">{{ rows.length }}</span>
      </button>
      <ZenIconButton icon="mdi mdi-view-grid-outline" title="Browse images" @click="openBrowse" />
      <ZenIconButton icon="mdi mdi-scale-balance" title="Reset every strength to 1.0" :disabled="!rows.length" @click="balance" />
      <ZenIconButton v-if="rows.length" icon="mdi mdi-broom" danger title="Remove all images" @click="clearAll" />
    </div>

    <input ref="fileInput" type="file" accept="image/*" multiple style="display: none" @change="onUpload" />

    <!-- browse dialog: multi-pick from the ComfyUI image folders. temp/ and output/ are how
         an image generated upstream gets in — preview or save it, then pick it here. -->
    <ZenModal v-model:open="browse" :title="`${srcType} images`" width="880px" height="78vh">
      <template #header>
        <span class="fg-search"><ZenInput v-model="bq" placeholder="Search images…" sm /></span>
        <ZenToggleGroup :model-value="srcType" :options="SRC_OPTS" @update:model-value="setSrc" />
        <ZenButton variant="ghost" sm icon="mdi mdi-upload" @click="triggerUpload">Upload</ZenButton>
      </template>

      <div class="fg-bgrid">
        <button
          v-for="it in browseItems"
          :key="it.type + ':' + it.name"
          class="fg-bcard"
          :class="{ sel: picked.has(it.name) }"
          @click="togglePick(it.name)"
        >
          <div class="fg-bcard-img">
            <img :src="thumbUrl(it.name, it.type)" loading="lazy" />
            <span v-if="picked.has(it.name)" class="fg-bcard-tick"><i class="mdi mdi-check" /></span>
          </div>
          <div class="fg-bcard-meta">
            <span class="fg-bcard-name" :title="it.name">{{ shortName(it.name) }}</span>
            <span class="fg-bcard-dir">{{ it.subfolder || '—' }}</span>
          </div>
        </button>
        <p v-if="!browseItems.length" class="fg-bgrid-empty">No images in {{ srcType }}/.</p>
      </div>

      <template #footer>
        <ZenButton variant="ghost" sm @click="browse = false">Cancel</ZenButton>
        <ZenButton variant="primary" sm :disabled="!picked.size" @click="addPicked">
          Add {{ picked.size || '' }} image{{ picked.size === 1 ? '' : 's' }}
        </ZenButton>
      </template>
    </ZenModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from 'vue'
import { ZenSlider, ZenNumber, ZenIconButton, ZenButton, ZenModal, ZenInput, ZenToggleGroup, ZenScroll } from '@zenkit/ui'
import { listImages, thumbUrl, uploadImage, shortName, type ImageItem, type SourceType } from '@/fusion/api'

/** One image in the fusion grid, referencing a file under a ComfyUI image folder.
 *  No fit here — every source is fitted "contain" (see fusion_input.py). */
interface FusionRow {
  id: string
  ref: string
  type: SourceType
  on: boolean
  strength: number
}

interface DOMWidget { value: unknown; callback?: (v: unknown) => void }
interface LGNode { graph?: { setDirtyCanvas?: (a: boolean, b: boolean) => void } }
const props = defineProps<{ widget?: DOMWidget; node?: LGNode }>()

const TYPES: SourceType[] = ['input', 'temp', 'output']
const SRC_OPTS = [
  { value: 'input', label: 'Input' },
  { value: 'output', label: 'Output' },
  { value: 'temp', label: 'Temp' },
]

const rows = ref<FusionRow[]>(parseRows(props.widget?.value))
const missing = ref<Set<string>>(new Set())
const busy = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const root = ref<HTMLElement | null>(null)

const dragOver = ref(false)
const dragIndex = ref(-1)
const dropIndex = ref(-1)

const browse = ref(false)
const images = ref<ImageItem[]>([])
const srcType = ref<SourceType>('input')
const bq = ref('')
const picked = ref<Set<string>>(new Set())

let seq = 0
function nextId() { return `r${Date.now().toString(36)}${(seq++).toString(36)}` }

function num(v: unknown, fallback: number) { const n = +(v as number); return Number.isFinite(n) ? n : fallback }
function parseRows(v: unknown): FusionRow[] {
  let arr = v
  if (typeof arr === 'string') { try { arr = JSON.parse(arr || '[]') } catch { arr = [] } }
  if (!Array.isArray(arr)) return []
  return arr
    // A row without a ref has no image — that also drops the socket rows an older version
    // of this node wrote into saved workflows.
    .filter((r) => r && typeof r === 'object' && r.ref)
    .map((r: any) => ({
      id: String(r.id ?? nextId()),
      ref: String(r.ref),
      type: (TYPES.includes(r.type) ? r.type : 'input') as SourceType,
      on: r.on !== false,
      strength: Math.max(0, num(r.strength, 1)),
    }))
}

/** Push rows to the widget value (serializes with the graph) + redraw the node. */
function commit() {
  if (props.widget) {
    const snapshot = rows.value.map((r) => ({ ...r }))
    props.widget.value = snapshot
    try { props.widget.callback?.(snapshot) } catch { /* no callback */ }
  }
  props.node?.graph?.setDirtyCanvas?.(true, true)
}

const enabledCount = computed(() => rows.value.filter((r) => r.on).length)
const totalStrength = computed(() => rows.value.reduce((sum, r) => (r.on ? sum + r.strength : sum), 0))

/** Each image's actual claim on the fused result — strength is relative, so this is what
 *  the backend's per-token renormalize ends up handing this source. */
function share(row: FusionRow): number {
  if (!row.on) return 0
  const total = totalStrength.value
  return total > 0 ? (row.strength / total) * 100 : 0
}

function onImgError(row: FusionRow) { missing.value = new Set(missing.value).add(row.ref) }

function setStrength(i: number, v: number) {
  const row = rows.value[i]
  if (!row) return
  row.strength = Math.max(0, v)
  commit()
}
function toggleOn(i: number) { const r = rows.value[i]; if (r) { r.on = !r.on; commit() } }
function removeRow(i: number) { rows.value.splice(i, 1); commit() }
function balance() { for (const r of rows.value) r.strength = 1; commit() }
function clearAll() { rows.value = []; commit() }

// --- wheel scrolling ----------------------------------------------------------------
// The graph canvas forwards every wheel event to itself from a CAPTURE listener on an
// ancestor, so it zooms instead of scrolling us and nothing we listen for locally is early
// enough to stop it. Its one opt-out is `data-capture-wheel="true"` on an element that
// CONTAINS document.activeElement — deliberately focus-gated, so hovering has to arm it.
// Canvas gestures (ctrl/meta+wheel, horizontal-dominant) are exempt from the opt-out on
// their side, so zoom and two-finger pan still reach the canvas while we hold focus.
// On a frontend older than the opt-out (~v1.33) this is inert, not broken.
const scrollEl = ref<ComponentPublicInstance | null>(null)
let prevFocus: HTMLElement | null = null

function scroller(): HTMLElement | null { return (scrollEl.value?.$el as HTMLElement) ?? null }
function isTyping(el: Element | null): boolean {
  const t = el as HTMLElement | null
  return !!t && (t.isContentEditable || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')
}

function armScroll() {
  const el = scroller()
  if (!el) return
  // Nothing to scroll: stay unarmed so wheeling over a short grid still zooms the canvas
  // rather than being swallowed. Re-evaluated on every enter, so it tracks the row count.
  if (el.scrollHeight <= el.clientHeight) return
  const active = document.activeElement as HTMLElement | null
  if (el.contains(active)) return // already armed, or a control inside owns focus
  if (isTyping(active)) return // never yank focus out of a field mid-keystroke
  prevFocus = active
  el.focus({ preventScroll: true })
}
/** Undo only the focus we synthesized — if a real control inside took it, leave it alone. */
function disarmScroll() {
  const el = scroller()
  if (!el || document.activeElement !== el) return
  if (prevFocus && prevFocus !== document.body && document.contains(prevFocus)) prevFocus.focus({ preventScroll: true })
  else el.blur()
  prevFocus = null
}

// --- adding files -------------------------------------------------------------------
function triggerUpload() { fileInput.value?.click() }
async function onUpload(e: Event) {
  const input = e.target as HTMLInputElement
  await addFiles([...(input.files ?? [])])
  input.value = '' // let the same file be picked again
}
function addRef(ref: string, type: SourceType = 'input') {
  rows.value.push({ id: nextId(), ref, type, on: true, strength: 1 })
}
async function addFiles(files: File[]) {
  const imgs = files.filter((f) => f.type.startsWith('image/'))
  if (!imgs.length) return
  busy.value = true
  try {
    for (const file of imgs) {
      const up = await uploadImage(file)
      if (up) addRef(up.ref, up.type)
      else console.error('[Nynxz] fusion grid upload failed', file.name)
    }
    commit()
  } finally {
    busy.value = false
  }
}

// --- drop zone (files from the OS) --------------------------------------------------
function onDragOver(e: DragEvent) {
  if (dragIndex.value >= 0) return // a card reorder is in flight, not a file drop
  if (!e.dataTransfer?.types?.includes('Files')) return
  dragOver.value = true
}
/** dragleave also fires on the root the instant the pointer crosses into a card, so the mask
 *  only clears once the pointer has actually left the widget (relatedTarget is null when it
 *  leaves the window entirely). */
function onDragLeave(e: DragEvent) {
  const to = e.relatedTarget as Node | null
  if (to && root.value?.contains(to)) return
  dragOver.value = false
}
async function onDrop(e: DragEvent) {
  dragOver.value = false
  if (dragIndex.value >= 0) return
  await addFiles([...(e.dataTransfer?.files ?? [])])
}

// --- reorder (source order drives the spatial patterns, so it's worth dragging) ------
function startReorder(i: number, e: DragEvent) {
  dragIndex.value = i
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(i)) // Firefox needs payload to start a drag
  }
}
/** A card claims the event only while one of its own thumbs is being reordered. Anything else
 *  is a file drag, which has to reach the root drop zone — a card is not a hole in it. */
function onRowDragOver(i: number, e: DragEvent) {
  if (dragIndex.value < 0) return
  e.stopPropagation()
  dropIndex.value = i
}
function onRowDrop(to: number, e: DragEvent) {
  if (dragIndex.value < 0) return
  e.preventDefault()
  e.stopPropagation()
  const from = dragIndex.value
  endReorder()
  if (from === to) return
  const moved = rows.value.splice(from, 1)[0]
  if (!moved) return
  rows.value.splice(to, 0, moved)
  commit()
}
function endReorder() { dragIndex.value = -1; dropIndex.value = -1 }

// --- browse dialog ------------------------------------------------------------------
const browseItems = computed(() => {
  const q = bq.value.trim().toLowerCase()
  return images.value.filter((it) => !q || it.name.toLowerCase().includes(q))
})
async function ensureImages(force = false) { images.value = await listImages(srcType.value, force) }
function openBrowse() {
  picked.value = new Set()
  bq.value = ''
  browse.value = true
  void ensureImages()
}
function setSrc(v: string) {
  srcType.value = v as SourceType
  picked.value = new Set()
  void ensureImages()
}
function togglePick(name: string) {
  const next = new Set(picked.value)
  if (next.has(name)) next.delete(name)
  else next.add(name)
  picked.value = next
}
function addPicked() {
  for (const it of images.value) if (picked.value.has(it.name)) addRef(it.name, it.type)
  commit()
  browse.value = false
}
</script>

<style scoped>
/* Fill layout (see mountWidget's `fill`): the widget takes the node body, the image grid
   takes whatever height is left and scrolls, and the toolbar is pinned under it. Resizing
   the node therefore shows more images, never more padding. */
.fg { position: relative; display: flex; flex-direction: column; gap: 7px; height: 100%; min-height: 0; padding: 2px; box-sizing: border-box; font-size: 12px; color: var(--zen-text, #e5e5ea); }

/* flex-basis 0 (not auto) so the grid's content can't push the toolbar off the node */
/* focused programmatically on hover (see armScroll) — never show a ring for it */
.fg-scroll { flex: 1 1 0; min-height: 0; outline: none; }
.fg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(124px, 1fr)); gap: 6px; align-items: start; padding-right: 2px; }

.fg-card { display: flex; flex-direction: column; gap: 3px; padding: 4px; border: 1px solid var(--zen-border, #34343c); border-radius: var(--zen-radius, 9px); background: var(--zen-input, #1b1b20); transition: border-color .12s ease, opacity .12s ease; }
.fg-card.off { opacity: .5; }
.fg-card.dragging { opacity: .35; }
.fg-card.over { border-color: var(--zen-accent, #6366f1); box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset; }

.fg-thumb { position: relative; width: 100%; aspect-ratio: 1; border-radius: var(--zen-radius, 6px); background: var(--zen-surface, #202026); overflow: hidden; cursor: grab; display: flex; align-items: center; justify-content: center; }
.fg-thumb:active { cursor: grabbing; }
/* contain on black: the encoder letterboxes with real black pixels, so the card shows the
   actual frame it gets rather than flattering it with a themed backdrop */
.fg-thumb img { width: 100%; height: 100%; display: block; object-fit: contain; background: #000; }
.fg-ph { font-size: 30px; color: var(--zen-muted, #9aa0aa); }
.fg-ph.warn { color: #e0a33a; }

.fg-idx { position: absolute; top: 4px; left: 4px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: var(--zen-radius, 5px); background: rgba(0, 0, 0, .62); color: #fff; font-size: 10px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }

.fg-acts { position: absolute; top: 4px; right: 4px; display: flex; gap: 3px; opacity: 0; transition: opacity .12s ease; }
.fg-card:hover .fg-acts { opacity: 1; }
.fg-act { width: 19px; height: 19px; padding: 0; border: none; border-radius: var(--zen-radius, 5px); background: rgba(0, 0, 0, .62); color: #fff; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.fg-act:hover { background: var(--zen-accent, #6366f1); }
.fg-act.danger:hover { background: #d9534f; }

.fg-mutemark { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, .45); color: #fff; font-size: 22px; pointer-events: none; }

/* name + share ride in the thumb's bottom strip rather than costing the card its own rows */
.fg-meta { position: absolute; left: 0; right: 0; bottom: 3px; display: flex; align-items: flex-end; gap: 4px; padding: 10px 5px 1px; background: linear-gradient(transparent, rgba(0, 0, 0, .78)); pointer-events: none; }
.fg-name { flex: 1; min-width: 0; font-size: 9.5px; color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, .9); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fg-pct { flex: none; font-size: 9.5px; font-weight: 700; line-height: 1.25; color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, .9); }
.fg-pct.dim { font-weight: 500; color: var(--zen-muted, #9aa0aa); }
/* the live share of the blend this source claims */
.fg-share { position: absolute; left: 0; bottom: 0; height: 3px; background: var(--zen-accent, #6366f1); transition: width .12s ease; pointer-events: none; }

.fg-foot { display: flex; align-items: center; gap: 5px; }
.fg-slider { flex: 1; min-width: 0; }
.fg-num { flex: none; width: 46px; }

/* fills the scroll area so the empty node reads as one big drop target */
.fg-empty { height: 100%; min-height: 96px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 18px 8px; text-align: center; color: var(--zen-muted, #9aa0aa); border: 1px dashed var(--zen-border, #34343c); border-radius: var(--zen-radius, 8px); background: color-mix(in srgb, var(--zen-text, #fff) 3%, transparent); }
.fg-empty > .mdi { font-size: 26px; opacity: .8; }
.fg-empty > span { font-size: 11px; }
.fg-empty > small { font-size: 10px; opacity: .7; }

.fg-warn { flex: none; display: flex; align-items: center; gap: 5px; padding: 5px 8px; border-radius: var(--zen-radius, 7px); background: color-mix(in srgb, #e0a33a 14%, transparent); color: #e0a33a; font-size: 10.5px; }

.fg-bar { flex: none; display: flex; align-items: center; gap: 6px; }
.fg-add { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 7px; border: 1px dashed var(--zen-border, #34343c); border-radius: var(--zen-radius, 7px); background: transparent; color: var(--zen-muted, #9aa0aa); font: inherit; font-size: 11px; font-weight: 600; cursor: pointer; transition: border-color .12s ease, color .12s ease, background .12s ease; }
.fg-add:hover:not(:disabled) { border-color: var(--zen-accent, #6366f1); color: var(--zen-text, #e5e5ea); background: color-mix(in srgb, var(--zen-accent, #6366f1) 8%, transparent); }
.fg-add:disabled { opacity: .6; cursor: default; }
.fg-add .mdi { font-size: 15px; }
.fg-add-n { margin-left: 2px; padding: 0 5px; border-radius: var(--zen-radius, 8px); background: color-mix(in srgb, var(--zen-accent, #6366f1) 22%, transparent); color: var(--zen-text, #e5e5ea); font-size: 10px; font-weight: 700; }

.fg-dropmask { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; border: 2px dashed var(--zen-accent, #6366f1); border-radius: var(--zen-radius, 9px); background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, rgba(0, 0, 0, .55)); color: var(--zen-text, #e5e5ea); font-size: 11px; font-weight: 600; pointer-events: none; }
.fg-dropmask .mdi { font-size: 28px; }

/* browse dialog */
.fg-search { flex: 1; min-width: 0; max-width: 320px; display: flex; }
.fg-bgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; align-items: start; }
.fg-bcard { display: flex; flex-direction: column; height: 170px; padding: 0; border: 1px solid var(--zen-border, #34343c); border-radius: var(--zen-radius, 9px); background: var(--zen-input, #1b1b20); cursor: pointer; overflow: hidden; text-align: left; color: inherit; font: inherit; }
.fg-bcard:hover { border-color: var(--zen-accent, #6366f1); }
.fg-bcard.sel { border-color: var(--zen-accent, #6366f1); box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset; }
.fg-bcard-img { position: relative; flex: 1 1 0; min-height: 0; width: 100%; display: flex; align-items: center; justify-content: center; background: var(--zen-surface, #202026); overflow: hidden; }
.fg-bcard-img img { width: 100%; height: 100%; object-fit: contain; display: block; }
.fg-bcard-tick { position: absolute; top: 5px; right: 5px; width: 22px; height: 22px; border-radius: 50%; background: var(--zen-accent, #6366f1); color: var(--zen-accent-text, #fff); display: inline-flex; align-items: center; justify-content: center; font-size: 14px; }
.fg-bcard-meta { flex: none; height: 38px; box-sizing: border-box; padding: 5px 8px; display: flex; flex-direction: column; justify-content: center; gap: 1px; border-top: 1px solid var(--zen-border, #34343c); }
.fg-bcard-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
.fg-bcard-dir { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10px; color: var(--zen-muted, #9aa0aa); }
.fg-bgrid-empty { grid-column: 1 / -1; text-align: center; color: var(--zen-muted, #9aa0aa); padding: 30px; }
</style>
