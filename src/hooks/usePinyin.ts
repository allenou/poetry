import { readonly } from 'vue'
import { useStorage } from '@vueuse/core'

const STORAGE_KEY = 'poetry:pinyin-enabled'

const pinyinEnabled = useStorage<boolean>(STORAGE_KEY, false, undefined, {
  mergeDefaults: true
})

/**
 * 全局拼音开关的组合式函数
 */
export const usePinyin = () => {
  const enable = () => {
    pinyinEnabled.value = true
  }

  const disable = () => {
    pinyinEnabled.value = false
  }

  const toggle = () => {
    pinyinEnabled.value = !pinyinEnabled.value
  }

  return {
    enabled: readonly(pinyinEnabled),
    enable,
    disable,
    toggle
  }
}

export default usePinyin
