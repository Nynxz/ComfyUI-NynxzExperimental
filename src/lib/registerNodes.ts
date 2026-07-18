// Turn a list of per-node definitions (see defineNode) into one ComfyUI extension. Collapses
// the old getCustomWidgets map + nodeCreated if-chain + slot-link calls into a single generic
// registrar: widgets register once by io-type, nodeCreated looks the node up by comfyClass and
// applies sizing / hideOutputImages / the preview mapper, and slot-links wire up (gracefully
// no-op'ing without ZenKit).

import { app } from '@comfy/app'
import { mountWidget } from '@/lib/mountWidget'
import { registerSlotLink } from '@/lib/zenGraph'
import type { NodeDef } from '@/lib/defineNode'

// The bits of a litegraph node we touch on create.
type LGNode = {
  constructor?: { comfyClass?: string }
  size: [number, number]
  setSize: (s: [number, number]) => void
  hideOutputImages?: boolean
  widgets?: { name: string; value: unknown; callback?: (v: unknown) => void }[]
  onExecuted?: (output: unknown) => void
}

const asArray = (v: string | string[]): string[] => (Array.isArray(v) ? v : [v])

export function registerNodes(name: string, defs: NodeDef[]): void {
  // comfyClass → def (an `is` array maps every class to the same def).
  const byClass = new Map<string, NodeDef>()
  for (const def of defs) for (const cls of asArray(def.is)) byClass.set(cls, def)

  // Widgets are global by io-type — register each type once (a type shared across nodes, e.g.
  // NYNXZ_SAVE_PREVIEW, only needs declaring on one def).
  const widgets: Record<string, (node: unknown) => unknown> = {}
  for (const def of defs)
    for (const w of def.widgets ?? []) {
      if (widgets[w.type]) continue
      widgets[w.type] = (node) =>
        mountWidget(node as never, {
          widgetName: w.name,
          widgetType: w.type,
          component: w.component,
          minHeight: w.minHeight,
          fill: w.fill,
          dragThrough: w.dragThrough,
          serialize: w.serialize,
          defaultValue: w.default,
        })
    }

  const settings = defs.flatMap((d) => d.settings ?? [])

  app.registerExtension({
    name,
    ...(settings.length ? { settings } : {}),
    getCustomWidgets() {
      return widgets
    },
    nodeCreated(node: unknown) {
      const lg = node as LGNode
      const def = byClass.get(lg.constructor?.comfyClass ?? '')
      if (!def) return
      if (def.minSize)
        lg.setSize([Math.max(lg.size[0], def.minSize[0]), Math.max(lg.size[1], def.minSize[1])])
      if (def.hideOutputImages) lg.hideOutputImages = true
      if (def.output) {
        const { widget, from } = def.output
        // Chain onExecuted: run any prior handler, then map the ui output into the widget (its
        // setter fires the widget callback → the Vue component re-renders).
        const prev = lg.onExecuted
        lg.onExecuted = function (this: unknown, output: unknown) {
          prev?.call(this, output)
          const w = lg.widgets?.find((c) => c.name === widget)
          if (!w) return
          const value = from((output ?? {}) as Record<string, unknown>)
          w.value = value
          try {
            w.callback?.(value)
          } catch {
            /* ignore */
          }
        }
      }
    },
  } as never)

  // Slot-links: middle-click the matched slot → spawn + wire the companion. No-op without ZenKit.
  for (const def of defs)
    for (const sl of def.slotLinks ?? [])
      for (const cls of asArray(def.is))
        registerSlotLink({
          on:
            sl.input != null
              ? { node: cls, input: sl.input }
              : { node: cls, output: sl.output as string },
          spawn: sl.spawn,
        })
}
