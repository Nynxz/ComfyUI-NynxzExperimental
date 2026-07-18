/**
 * Mount a Vue app inside a `node.addDOMWidget` container — the panel-free way to put
 * a custom UI on a node. `addDOMWidget` routes `widget.value` through getValue/setValue
 * (closure-backed here, so the value serializes with the graph and reloads on open).
 * The component receives `{ widget, node }`.
 *
 * The widget auto-grows: `getMinHeight` reports the live content height and a
 * ResizeObserver nudges the node to resize, so the node grows/shrinks with its content
 * instead of scrolling internally.
 */

import { createApp, type Component, type App as VueApp } from 'vue'

export interface DOMWidget {
  name: string
  type: string
  value: unknown
  options?: Record<string, unknown>
  callback?: (value: unknown) => void
  onRemove?: () => void
  serializeValue?: () => unknown
}

interface NodeLike {
  id: number | string
  size?: [number, number]
  setSize?: (s: [number, number]) => void
  computeSize?: () => [number, number]
  graph?: { setDirtyCanvas?: (a: boolean, b: boolean) => void }
  addDOMWidget: (
    name: string,
    type: string,
    el: HTMLElement,
    options?: Record<string, unknown>,
  ) => DOMWidget
}

export interface MountOptions {
  widgetName: string
  widgetType: string
  component: Component
  minHeight?: number
  defaultValue?: unknown
  /** Persist the value with the graph (default true). Set false for transient
   *  values like preview URLs that go stale on restart. */
  serialize?: boolean
  /** Fill the node body (height:100%) and stay user-resizable, instead of growing
   *  to fit content. Use for image/preview widgets that should stretch. */
  fill?: boolean
  /** Make the widget "visual only": it AND the host slot the renderer wraps it in ignore
   *  pointer events, so a press on the body falls through to the node (drag/select it).
   *  Interactive bits inside must opt back in with `pointer-events: auto`. */
  dragThrough?: boolean
}

const live = new WeakMap<DOMWidget, { app: VueApp; ro?: ResizeObserver }>()

export function mountWidget(node: NodeLike, opts: MountOptions): { widget: DOMWidget } {
  const fill = !!opts.fill
  // ETK model: in fill mode the container fills the node body (height:100%) with a CSS
  // min-height, the widget reports a FIXED getMinHeight, and we DON'T ResizeObserver /
  // setSize — so the node stays user-resizable and the widget stretches into it.
  const container = document.createElement('div')
  container.dataset['nynxz'] = opts.widgetType
  Object.assign(container.style, {
    width: '100%',
    overflow: fill ? 'hidden' : 'visible',
    pointerEvents: opts.dragThrough ? 'none' : 'auto',
    ...(fill ? { height: '100%', minHeight: `${opts.minHeight ?? 80}px` } : {}),
  })

  // Vue mounts into `inner`. Content-driven by default (its height drives the widget);
  // in fill mode it stretches to the node body instead.
  const inner = document.createElement('div')
  inner.style.width = '100%'
  if (fill)
    Object.assign(inner.style, {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box',
    })
  container.appendChild(inner)

  const floor = opts.minHeight ?? 40
  const serialize = opts.serialize !== false
  let stored: unknown = opts.defaultValue
  const widget = node.addDOMWidget(opts.widgetName, opts.widgetType, container, {
    // fill: report a fixed floor and let ComfyUI hand the widget the node's spare
    // height (the component fills it). content: grow to fit the rendered content.
    getMinHeight: () => (fill ? floor : Math.max(floor, Math.ceil(inner.scrollHeight))),
    hideOnZoom: false,
    serialize,
    getValue: () => stored,
    setValue: (v: unknown) => {
      stored = v
    },
  })
  if (serialize) widget.serializeValue = () => stored

  // resize the node to fit content whenever it changes (rows added/removed, reflow)
  function fit() {
    try {
      if (typeof node.computeSize === 'function' && typeof node.setSize === 'function') {
        const sz = node.computeSize()
        node.setSize([node.size?.[0] ?? sz[0], sz[1]])
      }
    } catch {
      /* layout not ready */
    }
    node.graph?.setDirtyCanvas?.(true, true)
  }

  Promise.resolve().then(() => {
    try {
      const app = createApp(opts.component, { widget, node })
      app.mount(inner)
      // Fill widgets are sized by the node (user-resizable) — don't auto-fit to content.
      let ro: ResizeObserver | undefined
      if (!fill && typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => fit())
        ro.observe(inner)
      }
      live.set(widget, { app, ro })
      if (!fill) fit()
      // dragThrough: the renderer wraps our container in a host slot that swallows pointer
      // events (Vue-nodes' WidgetDOM has its own @pointerdown.stop). Neutralize that wrapper
      // too so a press on the body reaches the node. Retry until the renderer parents us.
      if (opts.dragThrough) {
        const transp = () => {
          const h = container.parentElement as HTMLElement | null
          if (h) h.style.pointerEvents = 'none'
        }
        transp()
        ;[60, 200, 600, 1500].forEach((t) => window.setTimeout(transp, t))
      }
    } catch (err) {
      console.error('[Nynxz] failed to mount widget', opts.widgetType, err)
    }
  })

  const prevOnRemove = widget.onRemove
  widget.onRemove = () => {
    try {
      const l = live.get(widget)
      if (l) {
        l.ro?.disconnect()
        l.app.unmount()
        live.delete(widget)
      }
    } catch (err) {
      console.error('[Nynxz] widget unmount error', err)
    }
    try {
      prevOnRemove?.call(widget)
    } catch (err) {
      console.error('[Nynxz] chained onRemove error', err)
    }
  }

  return { widget }
}
