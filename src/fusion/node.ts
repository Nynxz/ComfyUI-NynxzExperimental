import { defineNode } from '@/lib/defineNode'
import FusionGrid from './FusionGrid.vue'
import FusionStage from './FusionStage.vue'
import FusionInspector from './FusionInspector.vue'

export const fusionInputNode = defineNode({
  is: 'nynxz.experimental.FusionInput',
  minSize: [340, 340],
  widgets: [
    // fill: the body is the node's — the image grid scrolls inside it and the toolbar stays
    // pinned to the bottom, so resizing the node shows more images rather than more padding.
    {
      name: 'grid',
      type: 'NYNXZ_FUSION_GRID',
      component: FusionGrid,
      minHeight: 200,
      fill: true,
      default: [],
    },
  ],
  // Middle-click the fusion_input output → spawn + wire the encoder. Lights up with ZenKit
  // installed, no-op otherwise.
  slotLinks: [{ output: 'fusion_input', spawn: 'nynxz.experimental.QwenFusionEncode' }],
})

// The wire-side collector. No custom widget any more — it carries plain native inputs (a
// shared strength float + fit combo), so all this contributes is the slot-link: middle-click
// the fusion_input output → spawn + wire the encoder (lights up with ZenKit, no-op otherwise).
export const fusionImagesNode = defineNode({
  is: 'nynxz.experimental.FusionImages',
  slotLinks: [{ output: 'fusion_input', spawn: 'nynxz.experimental.QwenFusionEncode' }],
})

// The staged composite. The body is a Vue canvas (FusionStage.vue) you arrange image layers
// on; it outputs the flattened composite AND a fusion_input whose layers carry their canvas
// box as a spatial region. fill: the canvas takes the node body and stays user-resizable.
export const fusionStudioNode = defineNode({
  is: 'nynxz.experimental.FusionStudio',
  minSize: [660, 520],
  widgets: [
    {
      name: 'stage',
      type: 'NYNXZ_FUSION_STAGE',
      component: FusionStage,
      minHeight: 320,
      fill: true,
      default: {},
    },
  ],
  slotLinks: [{ output: 'fusion_input', spawn: 'nynxz.experimental.QwenFusionEncode' }],
})

// Interactive debug view of a fusion blend. The `inspector` widget is display-only: it's fed the
// blend payload from the node's ui output each run (serialize:false — it's transient, never saved),
// and the component recolours the token grid from it. fill: the grid takes the node body.
export const fusionInspectorNode = defineNode({
  is: 'nynxz.experimental.FusionInspector',
  minSize: [460, 380],
  hideOutputImages: true,
  widgets: [
    {
      name: 'inspector',
      type: 'NYNXZ_INSPECTOR',
      component: FusionInspector,
      minHeight: 260,
      fill: true,
      serialize: false,
      default: {},
    },
  ],
  // On execute, map the node's ui `fusion_inspect` payload into the inspector widget → re-render.
  // ComfyUI wraps every ui value in a list, so unwrap [0] back to the payload dict.
  output: {
    widget: 'inspector',
    from: (o) => (Array.isArray(o.fusion_inspect) ? o.fusion_inspect[0] : o.fusion_inspect),
  },
})

// The encode node carries no custom widget, but owns a slot-link: middle-click its fusion_inspect
// output → spawn + wire a Fusion Inspector (lights up with ZenKit, no-op otherwise).
export const qwenFusionEncodeNode = defineNode({
  is: 'nynxz.experimental.QwenFusionEncode',
  slotLinks: [{ output: 'fusion_inspect', spawn: 'nynxz.experimental.FusionInspector' }],
})

export default [fusionInputNode, fusionImagesNode, fusionStudioNode, fusionInspectorNode, qwenFusionEncodeNode]
