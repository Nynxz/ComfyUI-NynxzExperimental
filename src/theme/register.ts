// Registers the ComfyUI "Theme" setting: a combo of `comfy` (ComfyUI owns its vars) plus every
// theme pack discovered at runtime from the server (see nodes/theme/api.py). The setting is the
// single source of truth — ComfyUI persists it (comfy.settings.json) and its value drives which
// pack is applied.
//
// The setting is added imperatively in setup() (not the declarative `settings` array the
// background uses) because a combo's `options` must be a static array, and the theme list isn't
// known until the async fetch resolves. Everything else mirrors src/background/register.ts.
//
// Mode (light/dark) follows ComfyUI's own: we resolve the active pack for whatever mode ComfyUI
// is in (its `.dark-theme` body class) and re-apply when the user toggles it. A single-mode pack
// falls back to the token set it has. We never toggle `.dark-theme` ourselves, so there's no
// tug-of-war with ComfyUI's palette.
import { app } from '@comfy/app'
import { applyTheme, registerPacks, themePacks, type ThemeMode } from './engine'
import { fetchThemes } from './api'

const SETTING_ID = 'nynxz.experimental.theme'

// Minimal view of ComfyUI's imperative settings API. We add the theme setting here rather than
// via the declarative `settings` array because a combo's options must be a static array and the
// theme list is only known after the async fetch. The typed `addSetting` constrains `id` to
// ComfyUI's built-in keys and is marked deprecated for extensions — neither applies to a
// runtime-added custom setting, so we go through this loose shape.
interface SettingsApi {
  addSetting(params: {
    id: string
    name: string
    category?: string[]
    type: string
    options?: Array<{ text: string; value: string }>
    defaultValue?: unknown
    tooltip?: string
    onChange?: (value: string) => void
  }): { value?: unknown }
}

let currentId = 'comfy'

function currentMode(): ThemeMode {
  return document.body.classList.contains('dark-theme') ? 'dark' : 'light'
}

function setTheme(id: string): void {
  currentId = id
  applyTheme(id, currentMode())
}

// Re-resolve the active pack when ComfyUI flips light/dark. Nothing to do for 'comfy'
// (ComfyUI owns its vars) — only a live pack needs its tokens recomputed for the new mode.
function watchMode(): void {
  let mode = currentMode()
  const obs = new MutationObserver(() => {
    const next = currentMode()
    if (next === mode) return
    mode = next
    if (currentId !== 'comfy') applyTheme(currentId, next)
  })
  obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
}

export function registerTheme(): void {
  app.registerExtension({
    name: 'nynxz.experimental.theme',
    async setup() {
      registerPacks(await fetchThemes())

      const options = [
        { text: 'Comfy (default)', value: 'comfy' },
        ...themePacks().map((p) => ({ text: p.name, value: p.id })),
      ]

      // addSetting returns the persisted-or-default value; onChange fires on later edits.
      let initial = 'comfy'
      try {
        const settings = app.ui?.settings as unknown as SettingsApi | undefined
        const added = settings?.addSetting({
          id: SETTING_ID,
          name: 'Theme',
          category: ['Nynxz Experimental', 'Appearance', 'Theme'],
          type: 'combo',
          options,
          defaultValue: 'comfy',
          tooltip:
            'Recolour the whole ComfyUI interface from a theme pack. "Comfy (default)" leaves ' +
            'ComfyUI\'s own theme untouched. Themes are JSON files in this pack\'s themes/ folder, ' +
            'discovered at load — drop one in and reload to add it.',
          onChange(value: string) {
            setTheme(String(value || 'comfy'))
          },
        })
        if (added && added.value != null) initial = String(added.value)
      } catch {
        // addSetting shape varies by version; fall back to the stored value below.
      }

      // Belt-and-suspenders: apply the stored value in case onChange didn't fire on load.
      try {
        const stored = app.extensionManager?.setting?.get(SETTING_ID)
        if (stored != null) initial = String(stored)
      } catch {
        /* setting API shape varies by version */
      }

      setTheme(initial)
      watchMode()
    },
  } as never)
}
