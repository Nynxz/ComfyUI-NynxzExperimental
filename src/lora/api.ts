// ComfyUI-Nynxz backend routes (same-origin fetch). Self-contained — no ZenTensors dep.

export interface LoraItem {
  name: string // relative path, '/'-separated
  has_preview: boolean
  favorite?: boolean
}

// Cached across all LoRA-stack instances — fetched once on first picker open, NOT eagerly
// on mount (N stacked LoRA nodes would otherwise each hit these endpoints on graph load).
let _lorasCache: Promise<LoraItem[]> | null = null
export function listLoras(force = false): Promise<LoraItem[]> {
  if (force || !_lorasCache) _lorasCache = fetchLoras()
  return _lorasCache
}
async function fetchLoras(): Promise<LoraItem[]> {
  try {
    const d = await (await fetch('/nynxz/experimental/loras')).json()
    const arr = Array.isArray(d.loras) ? d.loras : []
    return arr.map((l: any) => ({
      name: String(l.name).replace(/\\/g, '/'),
      has_preview: !!l.has_preview,
      favorite: !!l.favorite,
    }))
  } catch {
    return []
  }
}

export function previewUrl(name: string): string {
  return '/nynxz/experimental/lora/preview?name=' + encodeURIComponent(name)
}

let _favCache: Promise<string[]> | null = null
export function getFavorites(force = false): Promise<string[]> {
  if (force || !_favCache) _favCache = fetchFavorites()
  return _favCache
}
async function fetchFavorites(): Promise<string[]> {
  try {
    const d = await (await fetch('/nynxz/experimental/favorites')).json()
    return Array.isArray(d.loras) ? d.loras.map(String) : []
  } catch {
    return []
  }
}

export async function setFavorite(name: string, pinned: boolean): Promise<string[]> {
  try {
    const d = await (
      await fetch('/nynxz/experimental/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, pinned }),
      })
    ).json()
    const next = Array.isArray(d.loras) ? d.loras.map(String) : []
    _favCache = Promise.resolve(next) // keep the shared cache in sync for other instances
    return next
  } catch {
    return []
  }
}
