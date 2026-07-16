// One declarative definition per node — colocated with the node's component + api, and
// consumed by `registerNodes`. Replaces the old three-places-per-node model (a widget factory
// in getCustomWidgets, an `if (cls === …)` branch in nodeCreated, and a bottom-of-file
// registerSlotLink call) with a single object that owns everything about a node's frontend.

import type { Component } from "vue"

/** A DOM widget mounted in a node body (one Vue component per custom io type). */
export interface NodeWidgetDef {
  /** The widget's name on the node (what `node.widgets.find(w => w.name === …)` sees). */
  name: string
  /** The custom io type ComfyUI keys the widget on (e.g. "NYNXZ_SAVE_PREVIEW"). */
  type: string
  component: Component
  minHeight?: number
  /** Stretch to fill the node body (stays user-resizable) instead of growing to fit content. */
  fill?: boolean
  /** Visual-only body: a press falls through to drag/select the node. */
  dragThrough?: boolean
  /** Persist the value with the graph (default true; false for transient preview URLs). */
  serialize?: boolean
  /** Initial widget value. */
  default?: unknown
}

/** Middle-click a slot → spawn + wire a companion node. Lights up only when ZenKit is
 *  installed (a graceful no-op otherwise). Give exactly one of `input` / `output`. */
export interface SlotLinkDef {
  input?: string
  output?: string
  spawn: string
}

/** Everything about one node's frontend, in one place. */
export interface NodeDef {
  /** The comfyClass / V3 node_id this attaches to. An array applies the same body behavior
   *  (sizing, widgets, …) to several node classes at once (e.g. the three Lora loaders). */
  is: string | string[]
  /** Floor size applied on create: `setSize(max(current, min))`. */
  minSize?: [number, number]
  /** Suppress ComfyUI's default bottom image preview (when the node renders its own). */
  hideOutputImages?: boolean
  /** DOM widgets to mount. Registered globally by `type`, so a type shared across node
   *  classes only needs declaring on one def. */
  widgets?: NodeWidgetDef[]
  /** Preview plumbing: on execute, map the node's ui `output` → a widget value. Replaces the
   *  hand-written `onExecuted` wrappers. */
  output?: { widget: string; from: (output: Record<string, any>) => unknown }
  /** Slot-link compositions owned by this node. */
  slotLinks?: SlotLinkDef[]
  /** Node-scoped ComfyUI settings (merged into the extension's `settings`). */
  settings?: Record<string, unknown>[]
}

/** Identity helper — gives you typing + a stable colocation point in each node folder. */
export function defineNode(def: NodeDef): NodeDef {
  return def
}
