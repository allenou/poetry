import { ref, computed } from 'vue'

interface TtsOptions {
  rate?: number
  pitch?: number
  volume?: number
  lang?: string
}

export default function useTts(enabled: boolean = false, options: TtsOptions = {}) {
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const isSpeaking = ref(false)
  const currentUtterance = ref<SpeechSynthesisUtterance | null>(null)

  const defaultOptions = {
    rate: options.rate ?? 1,
    pitch: options.pitch ?? 1,
    volume: options.volume ?? 1,
    lang: options.lang ?? 'zh-CN'
  }

  const canUseTts = computed(() => enabled && isSupported)

  /**
   * 朗读文本
   */
  const speak = (text: string) => {
    if (!canUseTts.value || !text.trim()) return

    // 停止当前朗读
    stop()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = defaultOptions.rate
    utterance.pitch = defaultOptions.pitch
    utterance.volume = defaultOptions.volume
    utterance.lang = defaultOptions.lang

    utterance.onstart = () => {
      isSpeaking.value = true
      currentUtterance.value = utterance
    }

    utterance.onend = () => {
      isSpeaking.value = false
      currentUtterance.value = null
    }

    utterance.onerror = () => {
      isSpeaking.value = false
      currentUtterance.value = null
    }

    speechSynthesis.speak(utterance)
  }

  /**
   * 停止朗读
   */
  const stop = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      isSpeaking.value = false
      currentUtterance.value = null
    }
  }

  /**
   * 暂停朗读
   */
  const pause = () => {
    if (speechSynthesis) {
      speechSynthesis.pause()
      isSpeaking.value = false
    }
  }

  /**
   * 恢复朗读
   */
  const resume = () => {
    if (speechSynthesis) {
      speechSynthesis.resume()
      isSpeaking.value = true
    }
  }

  return {
    isSupported,
    canUseTts,
    isSpeaking,
    speak,
    stop,
    pause,
    resume
  }
}