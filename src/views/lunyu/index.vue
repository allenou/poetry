<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TLunYu } from "@/typings";
import useTtsEnabled from '@/hooks/useTtsEnabled'
import useTts from '@/hooks/useTts'
import { ref, computed } from 'vue'

const { flattenedData, loading } = useArticle<TLunYu[]>([], {
  flatten: true,
  articleType: 'lunyu'
})

const { enabled: ttsEnabled, toggle: toggleTts } = useTtsEnabled()

// 整篇朗读功能
const { canUseTts: canUseTtsGlobal, isSpeaking: isSpeakingGlobal, speak: speakGlobal, stop: stopGlobal } = useTts(ttsEnabled.value)

const getAllTextForTts = computed(() => {
  if (!flattenedData.value.length) return ''

  const allText = flattenedData.value.flatMap(item => {
    const lines = item.content || []
    return [item.title, ...lines].filter(text => text && text.trim())
  })

  return allText.join('\n')
})

const handleGlobalTtsClick = () => {
  if (isSpeakingGlobal.value) {
    stopGlobal()
  } else {
    speakGlobal(getAllTextForTts.value)
  }
}
</script>

<template>
  <Article :loading="loading">
    <div class="lunyu-page">
      <header class="lunyu-header">
        <h1 class="lunyu-title">论语</h1>
        <p class="lunyu-description">
          共收录 {{ flattenedData.length }} 篇内容
        </p>
        <!-- TTS 控制按钮 -->
        <div v-if="canUseTtsGlobal" class="tts-controls">
          <button
            class="tts-global-btn"
            @click="handleGlobalTtsClick"
            :title="isSpeakingGlobal ? '停止朗读整篇' : '朗读整篇'"
          >
            <svg
              v-if="!isSpeakingGlobal"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            {{ isSpeakingGlobal ? '停止' : '朗读整篇' }}
          </button>
          <label class="tts-toggle">
            <input
              type="checkbox"
              :checked="ttsEnabled"
              @change="toggleTts"
            />
            显示朗读图标
          </label>
        </div>
      </header>

      <VirtualList
        v-if="!loading && flattenedData.length > 0"
        :items="flattenedData"
        article-type="lunyu"
        :container-height="600"
        :item-height="100"
      />
    </div>
  </Article>
</template>

<style scoped lang="scss">
.lunyu-page {
  max-width: 1200px;
  margin: 0 auto;
}

.lunyu-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid #d4af37;
  position: relative;
}

.lunyu-title {
  font-size: 3rem;
  color: #8b2635;
  margin-bottom: 1rem;
  letter-spacing: 6px;
  font-weight: 600;
}

.lunyu-description {
  font-size: 1.2rem;
  color: #6b1c28;
  letter-spacing: 2px;
}

/* TTS 控制区域 */
.tts-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.tts-global-btn {
  background: #fef3c7;
  border: 1px solid #fde68a;
  color: #d97706;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.tts-global-btn:hover {
  background: #fde68a;
  transform: translateY(-1px);
}

.tts-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b1c28;
  font-size: 0.9rem;
}

.tts-toggle input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .lunyu-title {
    font-size: 2.2rem;
    letter-spacing: 4px;
  }

  .tts-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>