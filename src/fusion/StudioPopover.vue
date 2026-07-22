<template>
  <span ref="root" class="sp">
    <span class="sp-trigger" @click="toggle"><slot name="trigger" :active="open" /></span>
    <div v-if="open" class="sp-panel" :class="[align, { up }]" @pointerdown.stop>
      <slot :close="close" />
    </div>
  </span>
</template>

<script setup lang="ts">
// Inline anchored popover for the Fusion Studio toolbar. Deliberately NOT teleported: ComfyUI's
// node/canvas context breaks body-teleported overlays (clicks don't register), but an inline
// absolute panel — the Ideogram UiPopover approach — works. The panel lives inside `root`, so the
// capture-phase outside-click test (`root.contains`) is reliable. It drops down within the tall
// node body, so the fill widget's overflow:hidden doesn't clip it.
import { onBeforeUnmount, ref } from 'vue'

withDefaults(defineProps<{ align?: 'left' | 'right'; up?: boolean }>(), { align: 'left', up: false })

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function onDoc(e: Event) {
  if (root.value && !root.value.contains(e.target as Node)) close()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
function bind() {
  // pointerdown (capture) beats the graph canvas's own pointer handling; not mousedown, which the
  // canvas suppresses by preventDefault-ing pointerdown.
  document.addEventListener('pointerdown', onDoc, true)
  document.addEventListener('keydown', onKey)
}
function unbind() {
  document.removeEventListener('pointerdown', onDoc, true)
  document.removeEventListener('keydown', onKey)
}
function close() {
  open.value = false
  unbind()
}
function toggle() {
  open.value = !open.value
  if (open.value) bind()
  else unbind()
}
onBeforeUnmount(unbind)
</script>

<style scoped>
.sp {
  position: relative;
  display: inline-flex;
}
.sp-panel {
  position: absolute;
  top: calc(100% + 5px);
  z-index: 50;
  min-width: 212px;
  max-width: min(340px, 92vw);
  padding: 8px;
  box-sizing: border-box;
  background: var(--zen-surface, #202026);
  border: 1px solid var(--zen-border, #34343c);
  border-radius: var(--zen-radius, 8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: var(--zen-text, #e5e5ea);
  cursor: default;
}
.sp-panel.right {
  right: 0;
}
.sp-panel.left {
  left: 0;
}
.sp-panel.up {
  top: auto;
  bottom: calc(100% + 5px);
}
</style>
