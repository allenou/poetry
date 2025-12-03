<script setup lang="ts">
import { computed, ref } from 'vue'
import { buildPinyinSegments } from '@/utils/pinyin'
import useTts from '@/hooks/useTts'

interface Props {
  text: string
  enabled: boolean
  ttsEnabled?: boolean
}

const props = defineProps<Props>()

const segments = computed(() => (props.enabled ? buildPinyinSegments(props.text) : []))

// 用于跟踪当前显示 popover 的字符索引
const activePopoverIndex = ref<number | null>(null)

const showPopover = (index: number) => {
  activePopoverIndex.value = index
}

const hidePopover = () => {
  activePopoverIndex.value = null
}

// TTS 功能
const showTtsIcon = ref(false)
const { canUseTts, isSpeaking, speak, stop } = useTts(props.ttsEnabled)

const handleMouseEnter = () => {
  if (canUseTts.value && props.text.trim()) {
    showTtsIcon.value = true
  }
  // 多音字 popover 逻辑
  if (segments.value.some(seg => seg.type === 'ruby' && seg.isPolyphonic)) {
    // 保持现有的多音字逻辑
  }
}

const handleMouseLeave = () => {
  showTtsIcon.value = false
  hidePopover()
}

const handleTtsClick = (event: Event) => {
  event.stopPropagation()
  if (isSpeaking.value) {
    stop()
  } else {
    speak(props.text)
  }
}
</script>

<template>
  <span v-if="!enabled">
    {{ text }}
  </span>
  <span
    v-else
    class="pinyin-text"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-for="(segment, index) in segments" :key="index">
      <span
        v-if="segment.type === 'ruby'"
        class="pinyin-ruby-container"
        :class="{ 'pinyin-polyphonic-container': segment.isPolyphonic }"
        @mouseenter="segment.isPolyphonic ? showPopover(index) : null"
        @mouseleave="segment.isPolyphonic ? hidePopover() : null"
      >
        <ruby class="pinyin-ruby">
          <rb>{{ segment.char }}</rb>
          <rt>{{ segment.pinyin }}</rt>
        </ruby>
        <!-- 多音字 popover -->
        <div
          v-if="segment.isPolyphonic && activePopoverIndex === index"
          class="pinyin-popover"
        >
          <div class="pinyin-popover-content">
            <div
              v-for="(pinyin, pIndex) in segment.allPinyins"
              :key="pIndex"
              :class="['pinyin-option', { 'pinyin-option-active': pinyin === segment.pinyin }]"
            >
              {{ pinyin }}
            </div>
          </div>
        </div>
      </span>
      <span v-else class="pinyin-plain">{{ segment.text }}</span>
    </template>
    <!-- TTS 朗读图标 -->
    <button
      v-if="showTtsIcon && canUseTts"
      class="tts-icon"
      @click="handleTtsClick"
      :title="isSpeaking ? '停止朗读' : '朗读'"
    >
      <svg
        v-if="!isSpeaking"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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
        width="16"
        height="16"
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
    </button>
  </span>
</template>

<style scoped>
.pinyin-text {
  display: inline;
  position: relative;
}

.pinyin-ruby {
  ruby-position: over;
}

.pinyin-ruby rt {
  font-size: 0.65em;
  color: #d97706;
  letter-spacing: 0.1em;
}

.pinyin-ruby-container,
.pinyin-plain {
  position: relative;
  display: inline;
  margin-right: 0.2em;
}

/* 多音字的特殊样式 */
.pinyin-polyphonic-container .pinyin-ruby rb {
  color: #dc2626;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}

.pinyin-plain {
  white-space: pre-wrap;
}

/* Popover 样式 */
.pinyin-popover {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 4px;
  z-index: 1000;
  min-width: 80px;
  margin-top: 2px;
}

.pinyin-popover-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pinyin-option {
  padding: 2px 6px;
  font-size: 0.75em;
  color: #4b5563;
  border-radius: 2px;
  cursor: default;
}

.pinyin-option:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.pinyin-option-active {
  background-color: #fef3c7;
  color: #d97706;
  font-weight: bold;
}

.pinyin-option-active:hover {
  background-color: #fde68a;
  color: #d97706;
}

/* TTS 图标样式 */
.tts-icon {
  position: absolute;
  top: -2px;
  right: -20px;
  background: none;
  border: none;
  color: #4b5563;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  transition: all 0.2s ease;
  z-index: 1001;
}

.tts-icon:hover {
  color: #1f2937;
  background-color: #f3f4f6;
}

.tts-icon:focus {
  outline: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .tts-icon {
    right: -18px;
  }
}
</style>