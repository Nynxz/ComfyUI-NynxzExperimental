<template>
  <div class="ls">
    <div class="ls-mid">
      <div v-if="rows.length" class="ls-rows">
        <div v-for="(row, i) in rows" :key="i" class="ls-row" :class="{ off: !row.on }">
          <ZenSwitch :model-value="row.on" title="Enable" @update:model-value="setOn(i, $event)" />

          <ZenCombo
            class="ls-pick"
            :model-value="row.name"
            :items="items"
            :pinned="favorites"
            :menu-width="400"
            :item-height="54"
            placeholder="Select a LoRA…"
            empty-text="No LoRAs found"
            @update:model-value="setName(i, String($event))"
            @open="ensureLoras"
          >
            <template #selected>
              <span class="ls-sel">
                <img
                  v-if="row.name && selThumb(row.name)"
                  class="ls-thumb sm"
                  :src="preview(row.name)"
                  @error="onSelErr(row.name)"
                />
                <i v-else class="mdi mdi-cube-outline ls-thumb sm ph" />
                <span class="ls-sel-name">{{ row.name ? short(row.name) : 'Select a LoRA…' }}</span>
              </span>
            </template>
            <template #option="{ item }">
              <img
                v-if="hasPreview(item.value)"
                class="ls-thumb"
                :src="preview(item.value)"
                loading="lazy"
                @error="onImgErr"
              />
              <i v-else class="mdi mdi-cube-outline ls-thumb ph" />
              <span class="ls-opt-txt">
                <span class="ls-opt-name">{{ short(item.value) }}</span>
                <span v-if="folder(item.value)" class="ls-opt-dir">{{ folder(item.value) }}</span>
              </span>
              <button
                class="ls-star"
                :class="{ on: isFav(item.value) }"
                :title="isFav(item.value) ? 'Remove bookmark' : 'Bookmark'"
                @click.stop="toggleFav(item.value)"
              >
                <i class="mdi" :class="isFav(item.value) ? 'mdi-star' : 'mdi-star-outline'" />
              </button>
            </template>
            <template #footer="{ close }">
              <ZenButton
                variant="ghost"
                sm
                block
                icon="mdi mdi-view-grid-outline"
                @click="openBrowse(i, close)"
                >Browse all ({{ loras.length }})</ZenButton
              >
            </template>
          </ZenCombo>

          <ZenNumber
            class="ls-str"
            :model-value="row.strength"
            :step="0.05"
            :min="-10"
            :max="10"
            @update:model-value="setStrengthVal(i, $event)"
          />
          <ZenIconButton icon="mdi mdi-close" title="Remove" @click="removeRow(i)" />
        </div>
      </div>
      <div v-else class="ls-empty">
        <i class="mdi mdi-layers-triple-outline" />
        <span>No LoRAs in this stack yet</span>
      </div>
    </div>

    <div class="ls-foot">
      <button class="ls-add" @click="addRow()">
        <i class="mdi mdi-plus" /> Add LoRA<span v-if="rows.length" class="ls-add-n">{{
          rows.length
        }}</span>
      </button>
      <ZenIconButton
        icon="mdi mdi-view-grid-outline"
        title="Browse library"
        @click="openBrowse(-1)"
      />
      <ZenIconButton
        v-if="rows.length"
        icon="mdi mdi-broom"
        danger
        title="Clear all"
        @click="clearAll"
      />
    </div>

    <!-- expand-to-dialog browser -->
    <ZenModal v-model:open="browse" title="LoRA browser" width="880px" height="78vh">
      <template #header>
        <span class="ls-search"><ZenInput v-model="bq" placeholder="Search LoRAs…" sm /></span>
        <ZenToggleGroup v-model="bmode" :options="BMODES" />
        <ZenToggleGroup v-model="bfilter" :options="FILTERS" />
      </template>

      <!-- breadcrumb (folder mode, not searching) -->
      <div v-if="folderActive" class="ls-crumbs">
        <button class="ls-crumb" :class="{ on: !bpath }" @click="bpath = ''">all</button>
        <template v-for="(seg, i) in crumbSegs" :key="i">
          <i class="mdi mdi-chevron-right" />
          <button
            class="ls-crumb"
            :class="{ on: i === crumbSegs.length - 1 }"
            @click="bpath = crumbSegs.slice(0, i + 1).join('/')"
          >
            {{ seg }}
          </button>
        </template>
      </div>

      <div class="ls-grid">
        <!-- folders (drill in) -->
        <button
          v-for="f in gridFolders"
          :key="'d:' + f"
          class="ls-card ls-folder"
          @click="enterFolder(f)"
        >
          <div class="ls-card-img"><i class="mdi mdi-folder" /></div>
          <div class="ls-card-meta">
            <span class="ls-card-name" :title="f">{{ f }}</span>
            <span class="ls-card-dir">folder</span>
          </div>
        </button>
        <!-- loras -->
        <button
          v-for="it in gridFiles"
          :key="it.name"
          class="ls-card"
          :class="{ sel: browseTarget >= 0 && rows[browseTarget]?.name === it.name }"
          @click="pickFromBrowse(it.name)"
        >
          <div class="ls-card-img">
            <img v-if="it.has_preview" :src="preview(it.name)" loading="lazy" @error="onImgErr" />
            <i v-else class="mdi mdi-cube-outline" />
            <span
              class="ls-card-star"
              :class="{ on: isFav(it.name) }"
              @click.stop="toggleFav(it.name)"
            >
              <i class="mdi" :class="isFav(it.name) ? 'mdi-star' : 'mdi-star-outline'" />
            </span>
          </div>
          <div class="ls-card-meta">
            <span class="ls-card-name" :title="it.name">{{ short(it.name) }}</span>
            <span class="ls-card-dir">{{ folderActive ? '—' : folder(it.name) || '—' }}</span>
          </div>
        </button>
        <p v-if="!gridFolders.length && !gridFiles.length" class="ls-grid-empty">
          {{ folderActive ? 'Empty folder.' : 'No matches.' }}
        </p>
      </div>
    </ZenModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ZenCombo,
  ZenModal,
  ZenButton,
  ZenIconButton,
  ZenSwitch,
  ZenNumber,
  ZenInput,
  ZenToggleGroup,
  type ComboItem,
} from '@zenkit/ui'
import { listLoras, getFavorites, setFavorite, previewUrl, type LoraItem } from '@/lora/api'

interface LoraRow {
  on: boolean
  name: string
  strength: number
}
interface DOMWidget {
  value: unknown
  callback?: (v: unknown) => void
}
const props = defineProps<{
  widget?: DOMWidget
  node?: { graph?: { setDirtyCanvas?: (a: boolean, b: boolean) => void } }
}>()

const loras = ref<LoraItem[]>([])
const favorites = ref<string[]>([])
const rows = ref<LoraRow[]>(parseRows(props.widget?.value))
const browse = ref(false)
const browseTarget = ref(-1) // row index to pick into, or -1 = append a new row
const bq = ref('')
const bfilter = ref<'all' | 'fav'>('all')
const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'fav', label: 'Bookmarked', icon: 'mdi mdi-star' },
]
type ViewMode = 'flat' | 'folder'
const bmode = ref<ViewMode>('flat') // browse modal: flat grid vs folder navigation
const bpath = ref('') // current folder in the browse modal
const BMODES = [
  { value: 'flat', label: 'Flat' },
  { value: 'folder', label: 'Folders' },
]
const previewable = new Set<string>()

function num(v: unknown, fallback: number) {
  const n = +(v as number)
  return Number.isFinite(n) ? n : fallback
}
function parseRows(v: unknown): LoraRow[] {
  let arr = v
  if (typeof arr === 'string') {
    try {
      arr = JSON.parse(arr || '[]')
    } catch {
      arr = []
    }
  }
  if (!Array.isArray(arr)) return []
  return arr
    .filter((r) => r && typeof r === 'object')
    .map((r: any) => ({
      on: r.on !== false,
      name: String(r.name ?? ''),
      strength: num(r.strength, 1),
    }))
}

// Lazy: load LoRAs + favorites on first picker open (not on mount), so stacked LoRA nodes
// don't each hit /nynxz/loras + /nynxz/favorites on graph load. The api calls are cached.
async function ensureLoras() {
  const [ls, fs] = await Promise.all([listLoras(), getFavorites()])
  loras.value = ls
  favorites.value = fs
  for (const l of ls) if (l.has_preview) previewable.add(l.name)
  listLoaded.value = true
}

const items = computed<ComboItem[]>(() =>
  loras.value.map((l) => ({ value: l.name, label: short(l.name), keywords: l.name })),
)
const favSet = computed(() => new Set(favorites.value))
const browseItems = computed(() => {
  const q = bq.value.trim().toLowerCase()
  return loras.value.filter((l) => {
    if (bfilter.value === 'fav' && !favSet.value.has(l.name)) return false
    return !q || l.name.toLowerCase().includes(q)
  })
})

// --- browse-modal folder navigation ---
// Active only in folder mode with no search (search flattens across all folders).
const folderActive = computed(() => bmode.value === 'folder' && !bq.value.trim())
const crumbSegs = computed(() => (bpath.value ? bpath.value.split('/') : []))
const folderView = computed(() => {
  const prefix = bpath.value ? bpath.value + '/' : ''
  const folders = new Set<string>()
  const files: LoraItem[] = []
  for (const l of loras.value) {
    if (bfilter.value === 'fav' && !favSet.value.has(l.name)) continue
    if (prefix && !l.name.startsWith(prefix)) continue
    const rest = l.name.slice(prefix.length)
    const slash = rest.indexOf('/')
    if (slash === -1)
      files.push(l) // a LoRA directly in this folder
    else folders.add(rest.slice(0, slash)) // an immediate subfolder
  }
  return { folders: [...folders].sort(), files }
})
const gridFolders = computed(() => (folderActive.value ? folderView.value.folders : []))
const gridFiles = computed(() => (folderActive.value ? folderView.value.files : browseItems.value))

function short(name: unknown) {
  const base = String(name).split('/').pop() || String(name)
  return base.replace(/\.(safetensors|pt|ckpt|bin|lora)$/i, '')
}
function folder(name: unknown) {
  const parts = String(name).split('/')
  return parts.length > 1 ? parts.slice(0, -1).join('/') : ''
}
function hasPreview(name: unknown) {
  return previewable.has(String(name))
}
function preview(name: unknown) {
  return previewUrl(String(name))
}
// Selected-row thumb: optimistically show the preview before the list loads (so a saved
// LoRA's thumb appears on mount), falling back to the placeholder if it 404s. Once the
// list is loaded, previewable is authoritative.
const listLoaded = ref(false)
const selFailed = ref<Set<string>>(new Set())
function selThumb(name: unknown): boolean {
  const n = String(name)
  if (!n || selFailed.value.has(n)) return false
  return listLoaded.value ? previewable.has(n) : true
}
function onSelErr(name: unknown) {
  selFailed.value = new Set(selFailed.value).add(String(name))
}
function isFav(name: unknown) {
  return favSet.value.has(String(name))
}
function onImgErr(e: Event) {
  const img = e.target as HTMLImageElement
  previewable.delete(decodeURIComponent(new URL(img.src).searchParams.get('name') || ''))
  img.style.display = 'none'
}

// commit rows to the widget value (serializes with the graph) + redraw
function commit() {
  if (props.widget) {
    const snapshot = rows.value.map((r) => ({ ...r }))
    // Writing the ComfyUI DOM widget's value is how the stack serializes with the graph —
    // the intended mutation, same as the fusion grid.
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

function setOn(i: number, on: boolean) {
  if (rows.value[i]) {
    rows.value[i].on = on
    commit()
  }
}
function setName(i: number, name: string) {
  if (rows.value[i]) {
    rows.value[i].name = name
    commit()
  }
}
function setStrengthVal(i: number, v: number) {
  if (rows.value[i]) {
    rows.value[i].strength = v
    commit()
  }
}
function addRow(name = '') {
  rows.value.push({ on: true, name, strength: 1 })
  commit()
}
function removeRow(i: number) {
  rows.value.splice(i, 1)
  commit()
}
function clearAll() {
  rows.value = []
  commit()
}

function enterFolder(name: string) {
  bpath.value = bpath.value ? bpath.value + '/' + name : name
}
function openBrowse(target: number, closeMenu?: () => void) {
  closeMenu?.()
  void ensureLoras() // standalone "Browse library" can open without a combo first
  browseTarget.value = target
  bpath.value = ''
  browse.value = true
}
function pickFromBrowse(name: string) {
  if (browseTarget.value < 0) addRow(name)
  else setName(browseTarget.value, name)
  browse.value = false
}
async function toggleFav(name: unknown) {
  favorites.value = await setFavorite(String(name), !favSet.value.has(String(name)))
}
</script>

<style scoped>
/* natural content flow — the node auto-grows to fit (see mountWidget), so rows are never
   scrolled and the Add button simply follows the last row. */
.ls {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 2px;
  box-sizing: border-box;
  font-size: 12px;
  color: var(--zen-text, #e5e5ea);
}
.ls-mid {
  display: flex;
  flex-direction: column;
}
.ls-rows {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ls-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 14px 8px;
  text-align: center;
  color: var(--zen-muted, #9aa0aa);
  border: 1px dashed var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 8px);
  background: color-mix(in srgb, var(--zen-text, #fff) 3%, transparent);
}
.ls-empty > .mdi {
  font-size: 24px;
  opacity: 0.8;
}
.ls-empty > span {
  font-size: 11px;
}
.ls-row {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ls-row.off {
  opacity: 0.5;
}
.ls-pick {
  flex: 1;
  min-width: 0;
}
/* fixed width so every row's combo lines up regardless of the strength digits */
.ls-str {
  flex: none;
  width: 84px;
}

.ls-foot {
  flex: none;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ls-add {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px;
  border: 1px dashed var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 7px);
  background: transparent;
  color: var(--zen-muted, #9aa0aa);
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.12s ease,
    color 0.12s ease,
    background 0.12s ease;
}
.ls-add:hover {
  border-color: var(--zen-accent, #6366f1);
  color: var(--zen-text, #e5e5ea);
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 8%, transparent);
}
.ls-add .mdi {
  font-size: 15px;
}
.ls-add-n {
  margin-left: 4px;
  padding: 0 5px;
  border-radius: var(--zen-radius, 8px);
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 22%, transparent);
  color: var(--zen-text, #e5e5ea);
  font-size: 10px;
  font-weight: 700;
}

/* browse-modal folder navigation */
.ls-crumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  padding-bottom: 10px;
}
.ls-crumb {
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: var(--zen-radius, 5px);
  color: var(--zen-muted, #9aa0aa);
}
.ls-crumb:hover {
  color: var(--zen-text, #e5e5ea);
  background: color-mix(in srgb, var(--zen-text, #fff) 6%, transparent);
}
.ls-crumb.on {
  color: var(--zen-text, #e5e5ea);
  font-weight: 600;
}
.ls-crumbs .mdi {
  color: var(--zen-muted, #9aa0aa);
  font-size: 14px;
}
.ls-folder .ls-card-img {
  background: color-mix(in srgb, var(--zen-accent, #6366f1) 8%, var(--zen-surface, #202026));
}
.ls-folder .ls-card-img > .mdi {
  font-size: 40px;
  color: var(--zen-accent, #6366f1);
}

.ls-sel {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}
.ls-sel-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ls-thumb {
  flex: none;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: var(--zen-radius, 6px);
  background: var(--zen-input, #1b1b20);
  border: 1px solid var(--zen-border, #34343c);
}
.ls-thumb.sm {
  width: 18px;
  height: 18px;
  border-radius: var(--zen-radius, 5px);
}
.ls-thumb.ph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--zen-muted, #9aa0aa);
  font-size: 20px;
}
.ls-thumb.sm.ph {
  font-size: 11px;
}
.ls-opt-txt {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  line-height: 1.25;
}
.ls-opt-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12.5px;
}
.ls-opt-dir {
  font-size: 10px;
  color: var(--zen-muted, #9aa0aa);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ls-star {
  flex: none;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--zen-muted, #9aa0aa);
  font-size: 15px;
  padding: 2px;
  display: inline-flex;
}
.ls-star.on,
.ls-star:hover {
  color: #f5b301;
}

/* browser dialog */
.ls-search {
  flex: 1;
  min-width: 0;
  max-width: 320px;
  display: flex;
}
.ls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  align-items: start;
}
/* every card is a fixed size: fixed-height image + fixed-height meta, so neither the
   image dimensions nor the text length can change a card's footprint. */
.ls-card {
  display: flex;
  flex-direction: column;
  height: 170px;
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
.ls-card:hover {
  border-color: var(--zen-accent, #6366f1);
}
.ls-card.sel {
  border-color: var(--zen-accent, #6366f1);
  box-shadow: 0 0 0 1px var(--zen-accent, #6366f1) inset;
}
.ls-card-img {
  position: relative;
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--zen-surface, #202026);
  overflow: hidden;
}
.ls-card-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.ls-card-img > .mdi {
  font-size: 32px;
  color: var(--zen-muted, #9aa0aa);
}
.ls-card-star {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}
.ls-card-star.on {
  color: #f5b301;
}
/* fixed-height meta so every card is identical regardless of folder/name length */
.ls-card-meta {
  flex: none;
  height: 38px;
  box-sizing: border-box;
  padding: 5px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
  border-top: 1px solid var(--zen-border, #34343c);
}
.ls-card-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.ls-card-dir {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  color: var(--zen-muted, #9aa0aa);
}
.ls-grid-empty {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--zen-muted, #9aa0aa);
  padding: 30px;
}
</style>
