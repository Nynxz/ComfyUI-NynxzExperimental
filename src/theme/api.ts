// Fetch the theme manifest from this pack's own route (same-origin). Themes are discovered
// on the server from `themes/<id>/theme.json` at request time (see nodes/theme/api.py), so
// this returns whatever is on disk — no build step. Raw/unvalidated: engine.parsePack
// validates each entry at registration.

export async function fetchThemes(): Promise<unknown[]> {
  try {
    const res = await fetch('/nynxz/experimental/themes')
    const d = await res.json()
    return Array.isArray(d.themes) ? d.themes : []
  } catch {
    return [] // route missing / offline — the picker just falls back to 'comfy' only
  }
}
