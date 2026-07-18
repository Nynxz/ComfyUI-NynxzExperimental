import { defineNode } from '@/lib/defineNode'
import LoraStack from './LoraStack.vue'

// Node ids are namespaced by the experimental pack's NynxzNode base (nynxz.experimental.*),
// and the widget's io type is the namespaced NYNXZ_EXP_LORA_STACK — both must match the
// backend so the stack widget binds and won't collide with the ComfyUI-NynxzNodes copy.
export default defineNode({
  is: [
    'nynxz.experimental.NynxzLoraLoader',
    'nynxz.experimental.NynxzLoraLoaderCLIP',
    'nynxz.experimental.NynxzLoraPicker',
  ],
  minSize: [380, 130],
  widgets: [
    {
      name: 'stack',
      type: 'NYNXZ_EXP_LORA_STACK',
      component: LoraStack,
      minHeight: 60,
      default: [],
    },
  ],
})
