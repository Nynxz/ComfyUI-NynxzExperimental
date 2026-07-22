// Registers a ComfyUI setting that toggles the interactive shader background. The setting is
// the single source of truth — ComfyUI persists it (comfy.settings.json) and calls onChange
// with the stored value on load and on every change, so the background follows it directly.
import { app } from '@comfy/app'
import { setBackgroundEnabled, setBackgroundFollow, setBackgroundFollowSpeed, setBackgroundBlobFlow } from './background'

const SETTING_ID = 'nynxz.experimental.interactiveBackground'
const FOLLOW_ID = 'nynxz.experimental.backgroundFollow'
const FOLLOW_SPEED_ID = 'nynxz.experimental.backgroundFollowSpeed'
const BLOB_FLOW_ID = 'nynxz.experimental.backgroundBlobFlow'

export function registerBackground(): void {
  app.registerExtension({
    name: 'nynxz.experimental.background',
    settings: [
      {
        id: SETTING_ID,
        name: 'Interactive background',
        category: ['Nynxz Experimental', 'Canvas', 'Interactive background'],
        type: 'boolean',
        defaultValue: false,
        experimental: true,
        tooltip:
          'A WebGL grid of glowing dots behind the node graph that reacts to your cursor and ' +
          'follows your theme colors. Off by default.',
        onChange(value: boolean) {
          setBackgroundEnabled(!!value)
        },
      },
      {
        id: FOLLOW_ID,
        name: 'Cursor follow',
        category: ['Nynxz Experimental', 'Canvas', 'Cursor follow'],
        type: 'combo',
        defaultValue: 'snap',
        options: [
          { text: 'Snap (1:1)', value: 'snap' },
          { text: 'Follow (eased)', value: 'follow' },
          { text: 'Blob (droplet)', value: 'blob' },
        ],
        experimental: true,
        tooltip:
          'How the glow tracks your cursor. Snap sits exactly on it; Follow eases in behind it; ' +
          'Blob trails a tapered droplet that curves along the path you draw, like water being dragged.',
        onChange(value: string) {
          setBackgroundFollow(String(value))
        },
      },
      {
        id: FOLLOW_SPEED_ID,
        name: 'Follow speed',
        category: ['Nynxz Experimental', 'Canvas', 'Follow speed'],
        type: 'slider',
        defaultValue: 45,
        attrs: { min: 1, max: 100, step: 1 },
        experimental: true,
        tooltip: 'How quickly the glow catches up in Follow/Blob modes. Higher = snappier, lower = a longer, lazier trail.',
        onChange(value: number) {
          setBackgroundFollowSpeed(Number(value))
        },
      },
      {
        id: BLOB_FLOW_ID,
        name: 'Blob flow',
        category: ['Nynxz Experimental', 'Canvas', 'Blob flow'],
        type: 'slider',
        defaultValue: 55,
        attrs: { min: 0, max: 100, step: 1 },
        experimental: true,
        tooltip: 'Length and pointiness of the Blob droplet tail. Low = a short rounded blob; high = a long tapered comet tail.',
        onChange(value: number) {
          setBackgroundBlobFlow(Number(value))
        },
      },
    ],
    // Fallback: if this build of ComfyUI doesn't fire onChange on load, apply the stored values
    // once at startup. The setters are idempotent, so a double-apply is harmless.
    async setup() {
      try {
        const s = app.extensionManager?.setting
        const on = s?.get(SETTING_ID)
        if (on !== undefined) setBackgroundEnabled(!!on)
        const follow = s?.get(FOLLOW_ID)
        if (follow !== undefined) setBackgroundFollow(String(follow))
        const speed = s?.get(FOLLOW_SPEED_ID)
        if (speed !== undefined) setBackgroundFollowSpeed(Number(speed))
        const flow = s?.get(BLOB_FLOW_ID)
        if (flow !== undefined) setBackgroundBlobFlow(Number(flow))
      } catch {
        /* setting API shape varies by version — onChange already covers the common path */
      }
    },
  } as never)
}
