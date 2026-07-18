// Node-body widgets only — no ZenKit panel, no runtime ZenKit dependency. The imported
// @zenkit/ui/comfy-bridge.css maps --zen-* onto ComfyUI's native theme vars, so the
// @zenkit/ui components (bundled from source at build time) follow the user's ComfyUI theme
// with zero JS — the runtime-free equivalent of what @zenkit/core sets when ZenKit is installed.
//
// Every node's frontend is declared once, in a `node.ts` beside its component + api (see
// defineNode). registerNodes turns them into a single ComfyUI extension: DOM widgets, node
// sizing, and — when ZenKit is installed — middle-click slot composition. Add a node = add
// one file + one line here.
import { registerNodes } from '@/lib/registerNodes'
import fusionNode from '@/fusion/node'
import loraNode from '@/lora/node'
import { registerBackground } from '@/background/register'
import '@zenkit/ui/comfy-bridge.css'

registerNodes('nynxz.experimental', [fusionNode, loraNode])
registerBackground()
