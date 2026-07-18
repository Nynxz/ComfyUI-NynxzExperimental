declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@comfy/app' {
  import type { ComfyApp as ComfyAppInstance } from '@comfyorg/comfyui-frontend-types'
  export const app: ComfyAppInstance
  export const ComfyApp: {
    clipspace_return_node?: unknown
    open_maskeditor?: () => void
  }
}

declare module '@comfy/api' {
  import type { ComfyApi } from '@comfyorg/comfyui-frontend-types'
  export const api: ComfyApi
}
