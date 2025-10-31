<script setup lang="ts">
import { computed } from 'vue'
import { buildPinyinSegments } from '@/utils/pinyin'

interface Props {
  text: string
  enabled: boolean
}

const props = defineProps<Props>()

const segments = computed(() => (props.enabled ? buildPinyinSegments(props.text) : []))
</script>

<template>
  <span v-if="!enabled">
    {{ text }}
  </span>
  <span v-else class="pinyin-text">
    <template v-for="(segment, index) in segments" :key="index">
      <ruby v-if="segment.type === 'ruby'" class="pinyin-ruby">
        <rb>{{ segment.char }}</rb>
        <rt>{{ segment.pinyin }}</rt>
      </ruby>
      <span v-else class="pinyin-plain">{{ segment.text }}</span>
    </template>
  </span>
</template>

<style scoped>
.pinyin-text {
  display: inline;
}

.pinyin-ruby {
  ruby-position: over;
}

.pinyin-ruby rt {
  font-size: 0.65em;
  color: #d97706;
  letter-spacing: 0.1em;
}

.pinyin-plain {
  white-space: pre-wrap;
}
</style>
