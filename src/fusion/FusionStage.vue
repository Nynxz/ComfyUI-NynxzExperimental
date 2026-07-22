<template>
  <div class="fs" :class="{ dropping: dragOver }" @dragover.prevent.stop="onDragOver" @dragleave="onDragLeave" @drop.prevent.stop="onDrop">
    <div v-if="dragOver" class="fs-dropmask"><i class="mdi mdi-tray-arrow-down" /><span>Drop images to add layers</span></div>

    <!-- toolbar: undo/redo · resolution · library · settings -->
    <div class="fs-bar" @pointerdown.stop>
      <ZenIconButton icon="mdi mdi-undo" :disabled="!canUndo" title="Undo (Ctrl+Z)" @click="undo" />
      <ZenIconButton icon="mdi mdi-redo" :disabled="!canRedo" title="Redo (Ctrl+Shift+Z)" @click="redo" />
      <span class="fs-div" />
      <StudioPopover align="left">
        <template #trigger="{ active }">
          <button class="fs-tool" :class="{ on: active }" title="Canvas resolution">
            <i class="mdi mdi-aspect-ratio" /> {{ canvasW }}×{{ canvasH }} <i class="mdi mdi-chevron-down" />
          </button>
        </template>
        <div class="fs-pop">
          <div class="fs-pop-sec">Aspect ratio</div>
          <div class="fs-achips">
            <button v-for="a in ASPECTS" :key="a.label" class="fs-achip" :class="{ on: aspectLabel === a.label }" @click="setAspect(a.r)">{{ a.label }}</button>
          </div>
          <div class="fs-pop-sec">Size</div>
          <ZenDimensions :model-value="{ width: canvasW, height: canvasH }" :min="64" :max="4096" :step="8" show-swap show-mp show-aspect @update:model-value="setDims" />
        </div>
      </StudioPopover>
      <span class="fs-sp" />
      <ZenIconButton icon="mdi mdi-bookmark-multiple-outline" title="Preset library" @click="openLibrary" />
      <StudioPopover align="right">
        <template #trigger="{ active }">
          <button class="fs-tool fs-tool-icon" :class="{ on: active }" title="Fusion &amp; background settings"><i class="mdi mdi-tune-variant" /></button>
        </template>
        <template #default="{ close }">
          <div class="fs-pop">
            <div class="fs-pop-sec">Fuse output</div>
            <ZenToggleGroup class="fs-pop-fuse" :model-value="fuseAs" :options="FUSE_OPTS" @update:model-value="setFuseAs($event)" />
            <p class="fs-pop-note">
              <template v-if="fuseAs === 'layers'">Each layer becomes a spatial region — needs <b>Region Strength</b> &gt; 0 on the encode node.</template>
              <template v-else-if="fuseAs === 'flattened'">The flattened composite, as one fusion source.</template>
              <template v-else>Passes the upstream fusion input straight through.</template>
            </p>
            <div class="fs-pop-sec">Background</div>
            <div class="fs-pop-row">
              <ZenButton variant="ghost" sm icon="mdi mdi-image-outline" @click="close(); openBgBrowse()">{{ bgRef ? 'Change' : 'Image' }}</ZenButton>
              <label class="fs-color" title="Background colour"><input type="color" :value="bgColor" @input="setColor(($event.target as HTMLInputElement).value)" /></label>
              <ZenIconButton v-if="bgRef" icon="mdi mdi-image-off-outline" title="Clear image" @click="clearBg" />
            </div>
          </div>
        </template>
      </StudioPopover>
    </div>

    <!-- main: stage canvas + layer sidebar -->
    <div class="fs-main">
      <div ref="wrapEl" class="fs-stagewrap">
        <div
          ref="stageEl"
          class="fs-stage"
          :style="{ width: stageW + 'px', height: stageH + 'px' }"
          @pointerdown="onDown"
          @pointermove="onMove"
          @pointerup="onUp"
          @pointercancel="onUp"
        >
          <img v-if="bgRef && !bgMissing" class="fs-bg" :src="thumbUrl(bgRef, bgType)" draggable="false" alt="background" @error="bgMissing = true" />
          <div v-else class="fs-bg fs-bg-color" :style="{ background: bgColor }" />
          <div class="fs-grid" />

          <div
            v-for="(l, i) in layers"
            :key="l.id"
            class="fs-layer"
            :class="{ muted: !l.on, locked: l.locked }"
            :style="layerStyle(i, l)"
            :data-idx="i"
          >
            <img v-if="!missing.has(l.ref)" class="fs-layer-img" :src="thumbUrl(l.ref, l.type)" :style="{ objectFit: fitCss(l.fit), opacity: l.opacity, transform: flipTransform(l) }" draggable="false" loading="lazy" :data-idx="i" @error="onImgError(l)" />
            <i v-else class="mdi mdi-image-broken-variant fs-broken" :data-idx="i" title="File is gone from the folder" />
            <i v-if="l.locked" class="mdi mdi-lock fs-locked-badge" />
            <span v-if="!l.on" class="fs-hidden-badge"><i class="mdi mdi-eye-off" />hidden</span>
          </div>

          <!-- selection box: always above every layer, so a layer beneath others is still
               grabbable/resizable. The layer IMAGES keep their true z-order (the composite stays
               accurate) — only this outline + handles float on top. -->
          <div v-if="sel && sel.on && !sel.locked" class="fs-selbox" :style="selboxStyle" :data-idx="selected">
            <span class="fs-selbox-tag">{{ sel.label }}</span>
            <i v-for="hd in HANDLES" :key="hd" class="fs-h" :class="'fs-h-' + hd" :data-idx="selected" :data-handle="hd" />
          </div>

          <div v-if="!layers.length" class="fs-empty">
            <i class="mdi mdi-image-plus-outline" />
            <span>Add images to build a scene</span>
            <small>each layer becomes a fusion region</small>
            <button class="fs-empty-add" @click="triggerUpload"><i class="mdi mdi-plus" /> Add images</button>
          </div>
        </div>
      </div>

      <!-- layer list sidebar (front layer on top) -->
      <div class="fs-side" @pointerdown.stop>
        <div class="fs-side-head"><span>Layers</span><span class="fs-side-n">{{ layers.length }}</span></div>
        <div class="fs-list">
          <div
            v-for="row in listRows"
            :key="row.l.id"
            class="fs-row"
            :class="{ sel: selected === row.i, dragging: rowDrag === row.i, muted: !row.l.on }"
            @click="selected = row.i"
            @dragover.prevent
            @drop="onRowDrop(row.i, $event)"
          >
            <div class="fs-rowtop">
              <i class="mdi mdi-drag-vertical fs-grip" draggable="true" title="Drag to reorder" @dragstart="startRowDrag(row.i, $event)" @dragend="rowDrag = -1" />
              <span class="fs-rowthumb" :style="{ borderColor: color(row.i) }">
                <img v-if="!missing.has(row.l.ref)" :src="thumbUrl(row.l.ref, row.l.type)" :style="{ transform: flipTransform(row.l) }" loading="lazy" />
                <i v-else class="mdi mdi-image-broken-variant" />
              </span>
              <span class="fs-rowname" :title="row.l.label">{{ row.l.label }}</span>
              <button class="fs-ract" :class="{ act: row.l.locked }" :title="row.l.locked ? 'Locked — click to unlock (click-through on canvas)' : 'Lock — makes it click-through on the canvas'" @click.stop="toggleLock(row.i)"><i class="mdi" :class="row.l.locked ? 'mdi-lock' : 'mdi-lock-open-variant-outline'" /></button>
              <button class="fs-ract" :class="{ act: row.l.matte }" :title="row.l.matte ? `Cutout on — uses the image's transparency` : 'Cutout off — place the full image'" @click.stop="toggleMatte(row.i)"><i class="mdi mdi-scissors-cutting" /></button>
              <button class="fs-ract" :title="row.l.on ? 'Hide layer' : 'Show layer'" @click.stop="toggleOn(row.i)"><i class="mdi" :class="row.l.on ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" /></button>
              <button class="fs-ract danger" title="Remove layer" @click.stop="removeLayer(row.i)"><i class="mdi mdi-close" /></button>
            </div>
            <div class="fs-rowbot" @click.stop>
              <i class="mdi mdi-weight fs-wt" title="Fusion strength" />
              <ZenSlider class="fs-wslider" :model-value="row.l.strength" :min="0" :max="4" :step="0.05" @update:model-value="setField(row.i, 'strength', $event)" />
              <span class="fs-wnum">{{ row.l.strength.toFixed(2) }}</span>
            </div>
          </div>
          <p v-if="!layers.length" class="fs-list-empty">No layers yet.</p>
        </div>

        <!-- selected-layer controls (moved here from the old bottom bar) -->
        <div v-if="sel" class="fs-props" @click.stop>
          <div class="fs-props-h"><span class="fs-dot" :style="{ background: color(selected) }" /><span class="fs-props-name" :title="sel.label">{{ sel.label }}</span></div>
          <div class="fs-props-row">
            <ZenToggleGroup :model-value="sel.fit" :options="FIT_OPTS" @update:model-value="setField(selected, 'fit', $event)" />
            <span class="fs-props-sp" />
            <button class="fs-pbtn" :class="{ on: sel.flip_h }" title="Flip horizontal" @click="toggleFlip(selected, 'flip_h')"><i class="mdi mdi-flip-horizontal" /></button>
            <button class="fs-pbtn" :class="{ on: sel.flip_v }" title="Flip vertical" @click="toggleFlip(selected, 'flip_v')"><i class="mdi mdi-flip-vertical" /></button>
          </div>
          <select class="fs-select" :value="sel.blend" title="Blend mode" @change="setField(selected, 'blend', ($event.target as HTMLSelectElement).value)">
            <option v-for="b in BLENDS" :key="b" :value="b">{{ b.replace('_', ' ') }}</option>
          </select>
          <label class="fs-prop-slider" title="Opacity"><i class="mdi mdi-opacity" /><ZenSlider class="fs-pslider" :model-value="sel.opacity" :min="0" :max="1" :step="0.02" @update:model-value="setField(selected, 'opacity', $event)" /><span class="fs-prop-v">{{ Math.round(sel.opacity * 100) }}</span></label>
          <label class="fs-prop-slider" title="Soft edge"><i class="mdi mdi-blur" /><ZenSlider class="fs-pslider" :model-value="sel.feather" :min="0" :max="0.5" :step="0.01" @update:model-value="setField(selected, 'feather', $event)" /><span class="fs-prop-v">{{ sel.feather.toFixed(2) }}</span></label>
        </div>

        <div class="fs-side-foot">
          <button class="fs-add" :disabled="busy" @click="triggerUpload"><i class="mdi" :class="busy ? 'mdi-loading mdi-spin' : 'mdi-plus'" /> Add</button>
          <ZenIconButton icon="mdi mdi-view-grid-outline" title="Browse images" @click="openBrowse" />
        </div>
      </div>
    </div>

    <input ref="fileInput" type="file" accept="image/*" multiple style="display: none" @change="onUpload" />

    <!-- browse dialog (add layers, or pick a background) -->
    <ZenModal v-model:open="browse" :title="bgPick ? 'Pick background' : 'Add layers'" width="880px" height="78vh">
      <template #header>
        <span class="fs-search"><ZenInput v-model="bq" placeholder="Search images…" sm /></span>
        <ZenToggleGroup :model-value="srcType" :options="SRC_OPTS" @update:model-value="setSrc" />
        <ZenButton variant="ghost" sm icon="mdi mdi-upload" @click="triggerUpload">Upload</ZenButton>
      </template>
      <div class="fs-bgrid">
        <button v-for="it in browseItems" :key="it.type + ':' + it.name" class="fs-bcard" :class="{ sel: picked.has(it.name) }" @click="onPick(it.name)">
          <div class="fs-bcard-img">
            <img :src="thumbUrl(it.name, it.type)" loading="lazy" />
            <span v-if="picked.has(it.name)" class="fs-bcard-tick"><i class="mdi mdi-check" /></span>
          </div>
          <div class="fs-bcard-meta"><span class="fs-bcard-name" :title="it.name">{{ shortName(it.name) }}</span></div>
        </button>
        <p v-if="!browseItems.length" class="fs-bgrid-empty">No images in {{ srcType }}/.</p>
      </div>
      <template #footer>
        <ZenButton variant="ghost" sm @click="browse = false">{{ bgPick ? 'Cancel' : 'Done' }}</ZenButton>
        <ZenButton v-if="!bgPick" variant="primary" sm :disabled="!picked.size" @click="addPicked">Add {{ picked.size || '' }} layer{{ picked.size === 1 ? '' : 's' }}</ZenButton>
      </template>
    </ZenModal>

    <!-- preset library -->
    <ZenModal v-model:open="library" title="Stage presets" width="760px" height="72vh">
      <div class="fs-lib">
        <button v-for="st in stages" :key="st.stem" class="fs-libcard" @click="loadStage(st)">
          <div class="fs-libcard-img">
            <img v-if="st.has_thumb" :src="stageThumbUrl(st.stem, st.mtime)" loading="lazy" alt="" />
            <i v-else class="mdi mdi-layers-outline" />
            <button class="fs-libdel" title="Delete preset" @click.stop="delStage(st)"><i class="mdi mdi-close" /></button>
          </div>
          <span class="fs-libcard-name" :title="st.name">{{ st.name }}</span>
        </button>
        <p v-if="!stages.length" class="fs-lib-empty">No saved presets yet — build a stage and save it below.</p>
      </div>
      <template #footer>
        <ZenInput v-model="saveName" class="fs-libsave-name" placeholder="Preset name…" sm @keydown.enter="doSave" />
        <ZenButton variant="primary" sm :disabled="!saveName.trim() || saving" @click="doSave">{{ saving ? 'Saving…' : 'Save current' }}</ZenButton>
      </template>
    </ZenModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ZenSlider, ZenIconButton, ZenButton, ZenModal, ZenInput, ZenToggleGroup, ZenDimensions } from '@zenkit/ui'
import StudioPopover from './StudioPopover.vue'
import {
  listImages,
  thumbUrl,
  uploadImage,
  shortName,
  listStages,
  saveStage,
  deleteStage,
  stageThumbUrl,
  type ImageItem,
  type SourceType,
  type StageItem,
} from '@/fusion/api'

type FitMode = 'contain' | 'cover' | 'stretch'
type FuseMode = 'layers' | 'flattened' | 'off'
interface Layer {
  id: string
  ref: string
  type: SourceType
  x: number
  y: number
  w: number
  h: number
  fit: FitMode
  opacity: number
  blend: string
  feather: number
  flip_h: boolean
  flip_v: boolean
  matte: boolean
  on: boolean
  locked: boolean
  strength: number
  label: string
}
interface DOMWidget {
  value: unknown
  callback?: (v: unknown) => void
}
interface LGNode {
  graph?: { setDirtyCanvas?: (a: boolean, b: boolean) => void }
}
const props = defineProps<{ widget?: DOMWidget; node?: LGNode }>()

const FITS: FitMode[] = ['contain', 'cover', 'stretch']
const BLENDS = ['normal', 'multiply', 'screen', 'overlay', 'soft_light', 'hard_light', 'darken', 'lighten', 'difference', 'exclusion', 'add', 'subtract', 'color_dodge', 'color_burn']
const ASPECTS = [
  { label: '1:1', r: 1 },
  { label: '4:3', r: 4 / 3 },
  { label: '3:4', r: 3 / 4 },
  { label: '3:2', r: 3 / 2 },
  { label: '2:3', r: 2 / 3 },
  { label: '16:9', r: 16 / 9 },
  { label: '9:16', r: 9 / 16 },
]
const FIT_OPTS = [
  { value: 'contain', label: '', icon: 'mdi mdi-fit-to-page-outline', title: 'Contain' },
  { value: 'cover', label: '', icon: 'mdi mdi-crop', title: 'Cover' },
  { value: 'stretch', label: '', icon: 'mdi mdi-arrow-expand-all', title: 'Stretch' },
]
const FUSE_OPTS = [
  { value: 'layers', label: 'Layers', title: 'Each layer = a region-tagged fusion source' },
  { value: 'flattened', label: 'Flat', title: 'The composite as one fusion source' },
  { value: 'off', label: 'Off', title: 'Pass the upstream fusion_input through' },
]
const SRC_OPTS = [
  { value: 'input', label: 'Input' },
  { value: 'output', label: 'Output' },
  { value: 'temp', label: 'Temp' },
]
const TYPES: SourceType[] = ['input', 'temp', 'output']
const PALETTE = ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#06b6d4', '#a855f7', '#ef4444', '#84cc16']
const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as const
const MIN = 0.02

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const clamp01 = (v: number) => clamp(v, 0, 1)
function num(v: unknown, fallback: number) {
  const n = +(v as number)
  return Number.isFinite(n) ? n : fallback
}
let seq = 0
function nextId() {
  return `l${Date.now().toString(36)}${(seq++).toString(36)}`
}
function normLayer(r: unknown, i: number): Layer {
  const o = (r ?? {}) as Partial<Layer>
  return {
    id: String(o.id ?? nextId()),
    ref: String(o.ref ?? ''),
    type: (TYPES.includes(o.type as SourceType) ? o.type : 'input') as SourceType,
    x: clamp01(num(o.x, 0.1)),
    y: clamp01(num(o.y, 0.1)),
    w: clamp(num(o.w, 0.4), MIN, 1),
    h: clamp(num(o.h, 0.4), MIN, 1),
    fit: (FITS.includes(o.fit as FitMode) ? o.fit : 'contain') as FitMode,
    opacity: clamp01(num(o.opacity, 1)),
    blend: BLENDS.includes(String(o.blend)) ? String(o.blend) : 'normal',
    feather: clamp(num(o.feather, 0), 0, 0.5),
    flip_h: o.flip_h === true,
    flip_v: o.flip_v === true,
    matte: o.matte !== false,
    on: o.on !== false,
    locked: o.locked === true,
    strength: Math.max(0, num(o.strength, 1)),
    label: String(o.label ?? o.ref ?? `layer ${i + 1}`),
  }
}
function parse(v: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = (v ?? {}) as any
  const canvas = o.canvas ?? {}
  const bg = o.background ?? {}
  const arr = Array.isArray(o.layers) ? o.layers : []
  return {
    canvasW: Math.max(64, Math.min(4096, Math.round(num(canvas.width, 1024)))),
    canvasH: Math.max(64, Math.min(4096, Math.round(num(canvas.height, 1024)))),
    bgRef: String(bg.ref ?? ''),
    bgType: (TYPES.includes(bg.type) ? bg.type : 'input') as SourceType,
    bgColor: /^#[0-9a-fA-F]{6}$/.test(String(bg.color)) ? String(bg.color) : '#000000',
    layers: arr.map((r: unknown, i: number) => normLayer(r, i)),
    fuseAs: (['layers', 'flattened', 'off'].includes(o.fuse_as) ? o.fuse_as : 'layers') as FuseMode,
  }
}

const init = parse(props.widget?.value)
const canvasW = ref(init.canvasW)
const canvasH = ref(init.canvasH)
const bgRef = ref(init.bgRef)
const bgType = ref<SourceType>(init.bgType)
const bgColor = ref(init.bgColor)
const bgMissing = ref(false)
const layers = ref<Layer[]>(init.layers)
const fuseAs = ref<FuseMode>(init.fuseAs)
const selected = ref(init.layers.length ? 0 : -1)

const wrapEl = ref<HTMLElement | null>(null)
const stageEl = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const stageW = ref(280)
const stageH = ref(280)
const missing = ref<Set<string>>(new Set())
const busy = ref(false)
const dragOver = ref(false)

const sel = computed<Layer | null>(() => layers.value[selected.value] ?? null)
// Front layer (highest z / last in the array) at the top of the list.
const listRows = computed(() => layers.value.map((l, i) => ({ l, i })).reverse())
const color = (i: number) => PALETTE[i % PALETTE.length]
function fitCss(fit: FitMode): 'fill' | 'cover' | 'contain' {
  return fit === 'stretch' ? 'fill' : fit
}
function layerStyle(_i: number, l: Layer) {
  // Images render in true z-order (composite accuracy). Selection is drawn by fs-selbox on top.
  return {
    left: `${l.x * 100}%`,
    top: `${l.y * 100}%`,
    width: `${l.w * 100}%`,
    height: `${l.h * 100}%`,
    zIndex: _i + 1,
  }
}
const selboxStyle = computed(() => {
  const l = sel.value
  if (!l) return {}
  const c = color(selected.value)
  return {
    left: `${l.x * 100}%`,
    top: `${l.y * 100}%`,
    width: `${l.w * 100}%`,
    height: `${l.h * 100}%`,
    borderColor: c,
    color: c,
  }
})

function snapshot() {
  return {
    version: 1,
    canvas: { width: canvasW.value, height: canvasH.value },
    background: { ref: bgRef.value, type: bgType.value, color: bgColor.value },
    layers: layers.value.map((l) => ({ ...l })),
    fuse_as: fuseAs.value,
  }
}
function commit() {
  if (props.widget) {
    const snap = snapshot()
    // eslint-disable-next-line vue/no-mutating-props
    props.widget.value = snap
    try {
      props.widget.callback?.(snap)
    } catch {
      /* no callback */
    }
  }
  props.node?.graph?.setDirtyCanvas?.(true, true)
  scheduleCheckpoint()
}

// --- undo / redo. Debounced checkpoints so a drag or a slider sweep collapses to one step. ---
const undoStack = ref<string[]>([])
const redoStack = ref<string[]>([])
let baseline = ''
let restoring = false
let histTimer: number | undefined
const canUndo = computed(() => undoStack.value.length > 0)
const canRedo = computed(() => redoStack.value.length > 0)
function snapStr() {
  return JSON.stringify(snapshot())
}
function scheduleCheckpoint() {
  if (restoring) return
  if (histTimer) window.clearTimeout(histTimer)
  histTimer = window.setTimeout(checkpoint, 350)
}
function checkpoint() {
  if (histTimer) {
    window.clearTimeout(histTimer)
    histTimer = undefined
  }
  const s = snapStr()
  if (s === baseline) return
  undoStack.value = [...undoStack.value, baseline].slice(-60)
  redoStack.value = []
  baseline = s
}
function restoreFrom(s: string) {
  restoring = true
  try {
    const p = parse(JSON.parse(s))
    canvasW.value = p.canvasW
    canvasH.value = p.canvasH
    bgRef.value = p.bgRef
    bgType.value = p.bgType
    bgColor.value = p.bgColor
    bgMissing.value = false
    missing.value = new Set()
    layers.value = p.layers
    fuseAs.value = p.fuseAs
    if (selected.value >= p.layers.length) selected.value = p.layers.length - 1
    commit()
    fit()
  } finally {
    restoring = false
  }
}
function undo() {
  checkpoint() // flush a pending change into history first
  if (!undoStack.value.length) return
  redoStack.value = [...redoStack.value, baseline]
  baseline = undoStack.value[undoStack.value.length - 1]
  undoStack.value = undoStack.value.slice(0, -1)
  restoreFrom(baseline)
}
function redo() {
  if (!redoStack.value.length) return
  undoStack.value = [...undoStack.value, baseline]
  baseline = redoStack.value[redoStack.value.length - 1]
  redoStack.value = redoStack.value.slice(0, -1)
  restoreFrom(baseline)
}

function onImgError(l: Layer) {
  missing.value = new Set(missing.value).add(l.ref)
}
function writeLayer(i: number, patch: Partial<Layer>) {
  const next = layers.value.slice()
  if (!next[i]) return
  next[i] = { ...next[i], ...patch }
  layers.value = next
  commit()
}
function setField(i: number, key: keyof Layer, v: unknown) {
  if (key === 'fit') writeLayer(i, { fit: (FITS.includes(v as FitMode) ? v : 'contain') as FitMode })
  else if (key === 'blend') writeLayer(i, { blend: String(v) })
  else if (key === 'opacity' || key === 'feather' || key === 'strength') writeLayer(i, { [key]: num(v, key === 'strength' ? 1 : 0) } as Partial<Layer>)
}
function toggleOn(i: number) {
  writeLayer(i, { on: !(layers.value[i]?.on ?? true) })
}
function toggleMatte(i: number) {
  writeLayer(i, { matte: !(layers.value[i]?.matte ?? false) })
}
function toggleLock(i: number) {
  writeLayer(i, { locked: !(layers.value[i]?.locked ?? false) })
}
function toggleFlip(i: number, axis: 'flip_h' | 'flip_v') {
  writeLayer(i, { [axis]: !(layers.value[i]?.[axis] ?? false) } as Partial<Layer>)
}
function flipTransform(l: Layer): string {
  return `scaleX(${l.flip_h ? -1 : 1}) scaleY(${l.flip_v ? -1 : 1})`
}
function removeLayer(i: number) {
  const next = layers.value.slice()
  next.splice(i, 1)
  layers.value = next
  if (selected.value >= next.length) selected.value = next.length - 1
  commit()
}
function reorder(from: number, to: number) {
  if (to < 0 || to >= layers.value.length || from === to) return
  const next = layers.value.slice()
  const moved = next.splice(from, 1)[0]
  next.splice(to, 0, moved)
  layers.value = next
  selected.value = to
  commit()
}
const aspectLabel = computed(() => {
  const r = canvasW.value / Math.max(1, canvasH.value)
  return ASPECTS.find((a) => Math.abs(a.r - r) < 0.02)?.label ?? ''
})
function setDims(v: { width: number; height: number }) {
  canvasW.value = Math.max(64, Math.min(4096, Math.round(num(v.width, canvasW.value))))
  canvasH.value = Math.max(64, Math.min(4096, Math.round(num(v.height, canvasH.value))))
  fit()
  commit()
}
function setAspect(r: number) {
  // keep the pixel area (megapixels), just retarget the ratio, snapped to 8
  const area = Math.max(1, canvasW.value * canvasH.value)
  canvasW.value = Math.max(64, Math.min(4096, Math.round(Math.sqrt(area * r) / 8) * 8))
  canvasH.value = Math.max(64, Math.min(4096, Math.round(canvasW.value / r / 8) * 8))
  fit()
  commit()
}
function setFuseAs(v: unknown) {
  fuseAs.value = (['layers', 'flattened', 'off'].includes(v as string) ? v : 'layers') as FuseMode
  commit()
}

// --- background ---
function setColor(v: string) {
  bgColor.value = /^#[0-9a-fA-F]{6}$/.test(v) ? v : '#000000'
  commit()
}
function clearBg() {
  bgRef.value = ''
  bgMissing.value = false
  commit()
}

// --- layer-list drag reorder ---
const rowDrag = ref(-1)
function startRowDrag(i: number, e: DragEvent) {
  rowDrag.value = i
  selected.value = i
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(i))
  }
}
function onRowDrop(to: number, e: DragEvent) {
  e.preventDefault()
  const from = rowDrag.value
  rowDrag.value = -1
  if (from >= 0 && from !== to) reorder(from, to)
}

// --- pointer drag / resize on the stage. Capture on the STABLE stage element and bind move/up
// in the template (the CondMixer pattern proven in the Vue-node host). The earlier approach —
// capturing on the per-layer div + window listeners — was unreliable here (the layer div is a
// re-rendering target and the graph canvas fought the pointer), which is why boxes wouldn't move. ---
interface Drag {
  idx: number
  handle: string | null
  offX: number
  offY: number
}
let dragState: Drag | null = null
function stageNorm(e: PointerEvent) {
  const rect = stageEl.value?.getBoundingClientRect()
  if (!rect || rect.width === 0 || rect.height === 0) return { nx: 0, ny: 0 }
  return { nx: clamp((e.clientX - rect.left) / rect.width, 0, 1), ny: clamp((e.clientY - rect.top) / rect.height, 0, 1) }
}
function onDown(e: PointerEvent) {
  // Never let a press on the stage reach the graph canvas (node drag / pan).
  e.stopPropagation()
  const el = e.target as HTMLElement
  const idxAttr = el.dataset.idx
  if (idxAttr == null) {
    selected.value = -1 // press on empty stage deselects
    return
  }
  e.preventDefault()
  const idx = +idxAttr
  selected.value = idx
  const l = layers.value[idx]
  if (!l || !l.on || l.locked) return // muted/locked layers don't move (locked is click-through anyway)
  const { nx, ny } = stageNorm(e)
  dragState = { idx, handle: el.dataset.handle ?? null, offX: nx - l.x, offY: ny - l.y }
  try {
    stageEl.value?.setPointerCapture(e.pointerId) // capture on the stable stage, not the layer div
  } catch {
    /* capture unsupported */
  }
}
function onMove(e: PointerEvent) {
  if (!dragState) return
  const { nx, ny } = stageNorm(e)
  const l = layers.value[dragState.idx]
  if (!l) return
  if (!dragState.handle) {
    writeLayer(dragState.idx, { x: clamp(nx - dragState.offX, 0, 1 - l.w), y: clamp(ny - dragState.offY, 0, 1 - l.h) })
    return
  }
  let { x, y, w, h } = l
  const hd = dragState.handle
  if (hd.includes('e')) w = clamp(nx - x, MIN, 1 - x)
  if (hd.includes('s')) h = clamp(ny - y, MIN, 1 - y)
  if (hd.includes('w')) {
    const right = x + w
    x = clamp(nx, 0, right - MIN)
    w = right - x
  }
  if (hd.includes('n')) {
    const bottom = y + h
    y = clamp(ny, 0, bottom - MIN)
    h = bottom - y
  }
  writeLayer(dragState.idx, { x, y, w, h })
}
function onUp(e?: PointerEvent) {
  dragState = null
  if (e) {
    try {
      stageEl.value?.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }
}

// --- stage fit (letterbox to the canvas aspect) ---
function fit() {
  const wrap = wrapEl.value
  if (!wrap) return
  const bw = wrap.clientWidth
  const bh = wrap.clientHeight
  if (bw <= 0 || bh <= 0) return
  const asp = canvasW.value > 0 && canvasH.value > 0 ? canvasW.value / canvasH.value : 1
  let cw = bw
  let ch = bw / asp
  if (ch > bh) {
    ch = bh
    cw = bh * asp
  }
  stageW.value = Math.max(1, Math.floor(cw))
  stageH.value = Math.max(1, Math.floor(ch))
}

// --- adding images (mirrors FusionGrid.addFiles dedup-against-input) ---
function triggerUpload() {
  fileInput.value?.click()
}
async function onUpload(e: Event) {
  const input = e.target as HTMLInputElement
  await addFiles([...(input.files ?? [])])
  input.value = ''
}
function defaultBox(i: number) {
  const off = (i % 4) * 0.1
  return { x: 0.1 + off, y: 0.1 + off, w: 0.4, h: 0.4 }
}
function setBg(ref: string, type: SourceType) {
  bgRef.value = ref
  bgType.value = type
  bgMissing.value = false
}
function addRef(ref: string, type: SourceType = 'input') {
  // Always adds a LAYER. Background picks go through setBg() with an explicit intent, so an
  // OS-file drop or an upload can never be mistaken for a background swap — the old code read a
  // lingering bgPick flag here, which stayed true after any "Change background" and silently
  // routed every later drop into the stage background instead of adding a reference.
  const i = layers.value.length
  const box = defaultBox(i)
  // cutout defaults on: a transparent PNG composites cut-out; toggle off to place the full image.
  layers.value = [...layers.value, normLayer({ id: nextId(), ref, type, ...box, matte: true, label: shortName(ref) }, i)]
  selected.value = layers.value.length - 1
}
async function addFiles(files: File[]) {
  const imgs = files.filter((f) => f.type.startsWith('image/'))
  if (!imgs.length) return
  busy.value = true
  try {
    const existing = await listImages('input', true)
    const already = new Map<string, string>()
    for (const it of existing) {
      const key = `${shortName(it.name)} ${it.size ?? ''}`
      if (!already.has(key) || shortName(it.name) === it.name) already.set(key, it.name)
    }
    for (const file of imgs) {
      const key = `${file.name} ${file.size}`
      const hit = already.get(key)
      if (hit) {
        addRef(hit, 'input')
        continue
      }
      const up = await uploadImage(file)
      if (up) {
        addRef(up.ref, up.type)
        already.set(key, up.ref)
      } else console.error('[Nynxz] fusion stage upload failed', file.name)
    }
    commit()
  } finally {
    busy.value = false
  }
}

// --- drop zone (OS files) ---
function onDragOver(e: DragEvent) {
  if (rowDrag.value >= 0) return // a layer-row reorder is in flight, not a file drop
  if (!e.dataTransfer?.types?.includes('Files')) return
  dragOver.value = true
}
function onDragLeave(e: DragEvent) {
  const to = e.relatedTarget as Node | null
  if (to && (e.currentTarget as HTMLElement)?.contains(to)) return
  dragOver.value = false
}
async function onDrop(e: DragEvent) {
  dragOver.value = false
  if (rowDrag.value >= 0) return
  await addFiles([...(e.dataTransfer?.files ?? [])])
}

// --- browse dialog ---
const browse = ref(false)
const bgPick = ref(false)
const images = ref<ImageItem[]>([])
const srcType = ref<SourceType>('input')
const bq = ref('')
const picked = ref<Set<string>>(new Set())
const browseItems = computed(() => {
  const q = bq.value.trim().toLowerCase()
  return images.value.filter((it) => !q || it.name.toLowerCase().includes(q))
})
async function ensureImages(force = false) {
  images.value = await listImages(srcType.value, force)
}
function openBrowse() {
  bgPick.value = false
  picked.value = new Set()
  bq.value = ''
  browse.value = true
  void ensureImages()
}
function openBgBrowse() {
  bgPick.value = true
  picked.value = new Set()
  bq.value = ''
  browse.value = true
  void ensureImages()
}
// Never let the "pick a background" mode outlive the dialog — otherwise a later drop/upload,
// which shares addRef, would be treated as a background swap.
watch(browse, (open) => {
  if (!open) bgPick.value = false
})
function setSrc(v: unknown) {
  srcType.value = v as SourceType
  picked.value = new Set()
  void ensureImages()
}
function onPick(name: string) {
  if (bgPick.value) {
    const it = images.value.find((x) => x.name === name)
    setBg(name, (it?.type ?? srcType.value) as SourceType)
    commit()
    browse.value = false
    return
  }
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

// --- preset library ---
const library = ref(false)
const stages = ref<StageItem[]>([])
const saveName = ref('')
const saving = ref(false)
async function refreshStages() {
  stages.value = await listStages()
}
function openLibrary() {
  library.value = true
  saveName.value = ''
  void refreshStages()
}
/** A small schematic of the layout (bg colour + layer boxes) as a JPEG data-uri — cheap, and
 *  needs no image loading so the canvas never taints. */
function makeThumb(): string | undefined {
  try {
    const w = 240
    const h = Math.max(1, Math.round((w * canvasH.value) / Math.max(1, canvasW.value)))
    const cv = document.createElement('canvas')
    cv.width = w
    cv.height = h
    const ctx = cv.getContext('2d')
    if (!ctx) return undefined
    ctx.fillStyle = bgColor.value
    ctx.fillRect(0, 0, w, h)
    layers.value.forEach((l, i) => {
      const c = color(i)
      const x = l.x * w
      const y = l.y * h
      const bw = l.w * w
      const bh = l.h * h
      ctx.globalAlpha = l.on ? 0.5 : 0.2
      ctx.fillStyle = c
      ctx.fillRect(x, y, bw, bh)
      ctx.globalAlpha = 1
      ctx.strokeStyle = c
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, bw, bh)
    })
    return cv.toDataURL('image/jpeg', 0.8)
  } catch {
    return undefined
  }
}
async function doSave() {
  const name = saveName.value.trim()
  if (!name || saving.value) return
  saving.value = true
  try {
    await saveStage(name, snapshot(), makeThumb())
    saveName.value = ''
    await refreshStages()
  } finally {
    saving.value = false
  }
}
function loadStage(st: StageItem) {
  const p = parse(st.stage)
  canvasW.value = p.canvasW
  canvasH.value = p.canvasH
  bgRef.value = p.bgRef
  bgType.value = p.bgType
  bgColor.value = p.bgColor
  bgMissing.value = false
  missing.value = new Set()
  layers.value = p.layers
  fuseAs.value = p.fuseAs
  selected.value = p.layers.length ? 0 : -1
  commit()
  fit()
  library.value = false
}
async function delStage(st: StageItem) {
  await deleteStage(st.stem)
  await refreshStages()
}

let ro: ResizeObserver | undefined
onMounted(() => {
  baseline = snapStr()
  fit()
  if (wrapEl.value && typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => fit())
    ro.observe(wrapEl.value)
  }
  ;[0, 80, 300].forEach((t) => window.setTimeout(fit, t))
})
onBeforeUnmount(() => {
  onUp()
  ro?.disconnect()
  if (histTimer) window.clearTimeout(histTimer)
})
</script>

<style scoped>
.fs {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 2px;
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
  font-size: 12px;
  color: var(--zen-text, #e5e5ea);
  /* Ideogram Studio radius hierarchy: panels at --zen-radius, controls tighter at --radius-sm. */
  --fs-r: var(--zen-radius, 8px);
  --fs-rs: var(--radius-sm, 5px);
  --fs-sel: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, transparent);
}
.fs-bar {
  flex: none;
  display: flex;
  align-items: center;
  gap: 6px;
}
.fs-sp {
  flex: 1;
}
.fs-div {
  flex: none;
  width: 1px;
  height: 18px;
  background: var(--zen-border, #34343c);
  margin: 0 2px;
}
/* resolution trigger — Ideogram-style solid control */
.fs-tool {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 3px 8px;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--fs-rs);
  background: var(--zen-input, #1b1b20);
  color: var(--zen-text, #e5e5ea);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  font-variant-numeric: tabular-nums;
  transition: border-color 0.1s ease;
}
.fs-tool.fs-tool-icon {
  min-height: 24px;
  padding: 3px 6px;
}
.fs-tool:hover,
.fs-tool.on {
  border-color: var(--zen-accent, #6366f1);
}
.fs-tool.on {
  color: var(--zen-text, #e5e5ea);
}
.fs-tool .mdi {
  font-size: 13px;
  color: var(--zen-muted, #9aa0aa);
}

/* StudioPopover content is INLINE (inside .fs), so --fs-* would resolve — but --zen-* is used
   for consistency with the rest and is always available at :root. */
.fs-pop {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px;
  min-width: 212px;
}
.fs-pop-sec {
  font-size: 9.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--zen-muted, #9aa0aa);
}
.fs-pop-fuse {
  align-self: stretch;
}
.fs-pop-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.fs-pop-note {
  margin: 0;
  font-size: 10px;
  line-height: 1.35;
  color: var(--zen-muted, #9aa0aa);
}
.fs-pop-note b {
  color: var(--zen-text, #e5e5ea);
}
.fs-achips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.fs-achip {
  min-width: 34px;
  padding: 4px 7px;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 5px);
  background: var(--zen-input, #1b1b20);
  color: var(--zen-muted, #9aa0aa);
  font: inherit;
  font-size: 10.5px;
  font-weight: 600;
  cursor: pointer;
}
.fs-achip:hover {
  border-color: var(--zen-accent, #6366f1);
  color: var(--zen-text, #e5e5ea);
}
.fs-achip.on {
  border-color: var(--zen-accent, #6366f1);
  color: var(--zen-text, #e5e5ea);
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, var(--zen-input, #1b1b20));
}
.fs-color {
  display: inline-flex;
  width: 28px;
  height: 24px;
}
.fs-color input {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 5px);
  background: var(--zen-input, #1b1b20);
  cursor: pointer;
}

/* main two-pane */
.fs-main {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  gap: 6px;
}
.fs-stagewrap {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.fs-stage {
  position: relative;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 8px);
  overflow: hidden;
  background: var(--zen-input, #1b1b20);
  touch-action: none;
}
.fs-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
}
.fs-bg-color {
  object-fit: fill;
}
.fs-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(color-mix(in srgb, var(--zen-text, #fff) 5%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--zen-text, #fff) 5%, transparent) 1px, transparent 1px);
  background-size: 12.5% 12.5%;
}
.fs-layer {
  position: absolute;
  cursor: grab;
  box-sizing: border-box;
}
/* A muted (hidden) layer must read as OFF at a glance — not just a faint ghost. Desaturate and
   dim the picture, lay a dashed outline + diagonal hatch over it, and stamp a "hidden" badge. */
.fs-layer.muted .fs-layer-img,
.fs-layer.muted .fs-broken {
  filter: grayscale(1) brightness(0.5) contrast(0.95);
  opacity: 0.5;
}
.fs-layer.muted::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border: 1.5px dashed color-mix(in srgb, var(--zen-text, #fff) 60%, transparent);
  border-radius: 2px;
  background: repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.35) 0 5px, rgba(0, 0, 0, 0) 5px 12px);
}
.fs-hidden-badge {
  position: absolute;
  top: 3px;
  left: 3px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 5px 1px 4px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #fff;
  background: rgba(0, 0, 0, 0.72);
  border-radius: 3px;
  pointer-events: none;
}
.fs-hidden-badge .mdi {
  font-size: 11px;
}
/* locked layers are click-through on the canvas (select/edit them from the sidebar) */
.fs-layer.locked {
  pointer-events: none;
}
.fs-layer-img {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  user-select: none;
}
.fs-locked-badge {
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 11px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
  pointer-events: none;
}
/* selection box: floats above every layer so a covered layer stays grabbable */
.fs-selbox {
  position: absolute;
  z-index: 200;
  border: 1.5px solid;
  outline: 1px solid;
  outline-offset: -2px;
  border-radius: 2px;
  box-sizing: border-box;
  cursor: grab;
}
.fs-selbox:active {
  cursor: grabbing;
}
.fs-selbox-tag {
  position: absolute;
  top: 2px;
  left: 3px;
  max-width: calc(100% - 6px);
  padding: 0 3px;
  font-size: 9.5px;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
}
.fs-broken {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 28px;
  color: #e0a33a;
  background: color-mix(in srgb, #e0a33a 12%, transparent);
}
.fs-h {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border: 1px solid #333;
  border-radius: 2px;
  z-index: 20;
}
.fs-h-nw { top: -5px; left: -5px; cursor: nwse-resize; }
.fs-h-n  { top: -5px; left: 50%; margin-left: -5px; cursor: ns-resize; }
.fs-h-ne { top: -5px; right: -5px; cursor: nesw-resize; }
.fs-h-e  { top: 50%; right: -5px; margin-top: -5px; cursor: ew-resize; }
.fs-h-se { bottom: -5px; right: -5px; cursor: nwse-resize; }
.fs-h-s  { bottom: -5px; left: 50%; margin-left: -5px; cursor: ns-resize; }
.fs-h-sw { bottom: -5px; left: -5px; cursor: nesw-resize; }
.fs-h-w  { top: 50%; left: -5px; margin-top: -5px; cursor: ew-resize; }
.fs-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--zen-muted, #9aa0aa);
  text-align: center;
}
.fs-empty > .mdi {
  font-size: 28px;
  opacity: 0.8;
}
.fs-empty small {
  font-size: 10px;
  opacity: 0.7;
}
.fs-empty-add {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 1px solid var(--zen-accent, #6366f1);
  border-radius: var(--fs-rs);
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, transparent);
  color: var(--zen-text, #e5e5ea);
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

/* layer sidebar */
.fs-side {
  flex: none;
  width: 194px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 8px);
  background: color-mix(in srgb, var(--zen-text, #fff) 2%, transparent);
  overflow: hidden;
}
.fs-side-head {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--zen-muted, #9aa0aa);
  border-bottom: 1px solid var(--zen-border, #34343c);
}
.fs-side-n {
  padding: 0 5px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 22%, transparent);
  color: var(--zen-text, #e5e5ea);
  font-size: 10px;
}
.fs-list {
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.fs-row {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px 4px 5px;
  border: 1px solid transparent;
  border-radius: var(--fs-rs);
  background: var(--zen-input, #1b1b20);
  cursor: pointer;
}
.fs-row:hover {
  border-color: color-mix(in srgb, var(--zen-accent, #6366f1) 50%, transparent);
}
.fs-row.sel {
  border-color: var(--zen-accent, #6366f1);
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, var(--zen-input, #1b1b20));
}
.fs-row.dragging {
  opacity: 0.4;
}
.fs-row.muted {
  opacity: 0.55;
}
.fs-rowtop {
  display: flex;
  align-items: center;
  gap: 3px;
}
.fs-rowbot {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 2px;
}
.fs-wt {
  flex: none;
  font-size: 12px;
  color: var(--zen-muted, #9aa0aa);
}
.fs-wslider {
  flex: 1;
  min-width: 0;
}
.fs-wnum {
  flex: none;
  width: 26px;
  text-align: right;
  font-size: 9.5px;
  font-variant-numeric: tabular-nums;
  color: var(--zen-muted, #9aa0aa);
}
.fs-grip {
  flex: none;
  font-size: 14px;
  color: var(--zen-muted, #9aa0aa);
  cursor: grab;
}
.fs-grip:active {
  cursor: grabbing;
}
.fs-rowthumb {
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  border: 1.5px solid;
  overflow: hidden;
  background: var(--zen-surface, #202026);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fs-rowthumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.fs-rowthumb > .mdi {
  font-size: 14px;
  color: #e0a33a;
}
.fs-rowname {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10.5px;
}
.fs-ract {
  flex: none;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: var(--fs-rs);
  background: transparent;
  color: var(--zen-muted, #9aa0aa);
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.fs-ract:hover {
  background: color-mix(in srgb, var(--zen-text, #fff) 10%, transparent);
  color: var(--zen-text, #e5e5ea);
}
.fs-ract.act {
  color: var(--zen-accent, #6366f1);
}
.fs-ract.danger:hover {
  background: color-mix(in srgb, #d9534f 22%, transparent);
  color: #ff6b66;
}
.fs-list-empty {
  margin: 0;
  padding: 12px 6px;
  text-align: center;
  font-size: 10px;
  color: var(--zen-muted, #9aa0aa);
}
.fs-side-foot {
  flex: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-top: 1px solid var(--zen-border, #34343c);
}
/* solid control, matching Ideogram's UiButton (subtle fill, border, accent-border on hover) */
.fs-add {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 26px;
  padding: 4px 10px;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--fs-rs);
  background: var(--zen-input, #1b1b20);
  color: var(--zen-text, #e5e5ea);
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.1s ease,
    background 0.1s ease;
}
.fs-add:hover:not(:disabled) {
  border-color: var(--zen-accent, #6366f1);
}
.fs-add:disabled {
  opacity: 0.4;
  cursor: default;
}

/* selected-layer controls, in the sidebar (vertical) */
.fs-props {
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 6px;
  border-top: 1px solid var(--zen-border, #34343c);
}
.fs-props-h {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
}
.fs-dot {
  flex: none;
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.fs-props-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fs-props-row {
  display: flex;
  align-items: center;
  gap: 5px;
}
.fs-props-sp {
  flex: 1;
}
.fs-pbtn {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--fs-rs);
  background: var(--zen-input, #1b1b20);
  color: var(--zen-muted, #9aa0aa);
  cursor: pointer;
  font-size: 13px;
}
.fs-pbtn:hover {
  color: var(--zen-text, #e5e5ea);
  border-color: var(--zen-accent, #6366f1);
}
.fs-pbtn.on {
  color: var(--zen-accent, #6366f1);
  border-color: var(--zen-accent, #6366f1);
}
.fs-select {
  width: 100%;
  height: 24px;
  padding: 0 4px;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--fs-rs);
  background: var(--zen-input, #1b1b20);
  color: var(--zen-text, #e5e5ea);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  text-transform: capitalize;
}
.fs-prop-slider {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--zen-muted, #9aa0aa);
}
.fs-prop-slider .mdi {
  font-size: 13px;
  flex: none;
}
.fs-prop-slider .fs-pslider {
  flex: 1;
  min-width: 0;
}
.fs-prop-v {
  flex: none;
  width: 26px;
  text-align: right;
  font-size: 9.5px;
  font-variant-numeric: tabular-nums;
}

.fs-dropmask {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 2px dashed var(--zen-accent, #6366f1);
  border-radius: var(--zen-radius, 9px);
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 16%, rgba(0, 0, 0, 0.55));
  color: var(--zen-text, #e5e5ea);
  font-size: 11px;
  font-weight: 600;
  pointer-events: none;
}
.fs-dropmask .mdi {
  font-size: 28px;
}

/* browse dialog */
.fs-search {
  flex: 1;
  min-width: 0;
  max-width: 320px;
  display: flex;
}
.fs-bgrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  align-items: start;
}
.fs-bcard {
  display: flex;
  flex-direction: column;
  height: 160px;
  padding: 0;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 9px);
  background: var(--zen-input, #1b1b20);
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  color: inherit;
  font: inherit;
}
.fs-bcard:hover,
.fs-bcard.sel {
  border-color: var(--zen-accent, #6366f1);
}
.fs-bcard.sel {
  box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset;
}
.fs-bcard-img {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--zen-surface, #202026);
  overflow: hidden;
}
.fs-bcard-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.fs-bcard-tick {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--zen-accent, #6366f1);
  color: var(--zen-accent-text, #fff);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.fs-bcard-meta {
  flex: none;
  height: 32px;
  box-sizing: border-box;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--zen-border, #34343c);
}
.fs-bcard-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
}
.fs-bgrid-empty {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--zen-muted, #9aa0aa);
  padding: 30px;
}

/* preset library */
.fs-lib {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  align-items: start;
}
.fs-libcard {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  text-align: left;
}
.fs-libcard-img {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 9px);
  background: var(--zen-surface, #202026);
  overflow: hidden;
}
.fs-libcard:hover .fs-libcard-img {
  border-color: var(--zen-accent, #6366f1);
}
.fs-libcard-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.fs-libcard-img > .mdi {
  font-size: 32px;
  color: var(--zen-muted, #9aa0aa);
}
.fs-libdel {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  opacity: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.12s ease;
}
.fs-libcard:hover .fs-libdel {
  opacity: 1;
}
.fs-libdel:hover {
  background: #d9534f;
}
.fs-libcard-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  color: var(--zen-text, #e5e5ea);
}
.fs-lib-empty {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--zen-muted, #9aa0aa);
  padding: 30px;
}
.fs-libsave-name {
  flex: 1;
  min-width: 0;
  max-width: 260px;
}
</style>
