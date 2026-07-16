import { defineNode } from "@/lib/defineNode"
import FusionGrid from "./FusionGrid.vue"

export default defineNode({
  is: "nynxz.experimental.FusionInput",
  minSize: [340, 340],
  widgets: [
    // fill: the body is the node's — the image grid scrolls inside it and the toolbar stays
    // pinned to the bottom, so resizing the node shows more images rather than more padding.
    { name: "grid", type: "NYNXZ_FUSION_GRID", component: FusionGrid, minHeight: 200, fill: true, default: [] },
  ],
  // Middle-click the fusion_input output → spawn + wire the encoder. Lights up with ZenKit
  // installed, no-op otherwise.
  slotLinks: [{ output: "fusion_input", spawn: "nynxz.experimental.QwenFusionEncode" }],
})
