import { ref, watch } from 'vue'

// 从 localStorage 读取初始值
const getInitialTtsEnabled = (): boolean => {
  try {
    const saved = localStorage.getItem('tts-enabled')
    return saved === 'true'
  } catch (e) {
    return false
  }
}

const ttsEnabled = ref(getInitialTtsEnabled())

// 监听变化并保存到 localStorage
watch(ttsEnabled, (newValue) => {
  try {
    localStorage.setItem('tts-enabled', String(newValue))
  } catch (e) {
    // localStorage 不可用时忽略
  }
})

export default function useTtsEnabled() {
  return {
    enabled: ttsEnabled,
    toggle: () => {
      ttsEnabled.value = !ttsEnabled.value
    },
    enable: () => {
      ttsEnabled.value = true
    },
    disable: () => {
      ttsEnabled.value = false
    }
  }
}