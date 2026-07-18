// Registers a ComfyUI setting that toggles the interactive shader background. The setting is
// the single source of truth — ComfyUI persists it (comfy.settings.json) and calls onChange
// with the stored value on load and on every change, so the background follows it directly.
import { app } from '@comfy/app'
import { setBackgroundEnabled } from './background'

const SETTING_ID = 'nynxz.experimental.interactiveBackground'

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
    ],
    // Fallback: if this build of ComfyUI doesn't fire onChange on load, apply the stored value
    // once at startup. setBackgroundEnabled is idempotent, so a double-apply is harmless.
    async setup() {
      try {
        const on = app.extensionManager?.setting?.get(SETTING_ID)
        if (on !== undefined) setBackgroundEnabled(!!on)
      } catch {
        /* setting API shape varies by version — onChange already covers the common path */
      }
    },
  } as never)
}
