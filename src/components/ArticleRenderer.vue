<script setup lang="ts">
import type { FlattenedItem } from '@/utils/flattenArticles'

interface Props {
  item: FlattenedItem
  articleType: 'lunyu' | 'shijing' | 'yuanqu' | 'caocao' | 'youmengying' | 'sishuwujing'
}

const props = defineProps<Props>()

// 根据类型和层级渲染不同的样式
const getItemClass = (item: FlattenedItem) => {
  const baseClass = 'line'
  
  switch (item.type) {
    case 'chapter':
      return `${baseClass} chapter-title`
    case 'section':
      return `${baseClass} section-title`
    case 'author':
      return `${baseClass} author-title`
    case 'article':
      return `${baseClass} article-title`
    case 'content':
      return `${baseClass} content-text`
    default:
      return baseClass
  }
}

// 根据层级获取标题标签
const getHeadingTag = (level: number) => {
  switch (level) {
    case 1:
      return 'h2'
    case 2:
      return 'h3'
    case 3:
      return 'h4'
    default:
      return 'div'
  }
}
</script>

<template>
  <div class="article-renderer">
    <component 
      :is="getHeadingTag(item.level)"
      v-if="item.type !== 'content'"
      :class="getItemClass(item)"
      v-memo="[item.id, item.type, item.title]"
    >
      {{ item.title }}
    </component>
    
    <!-- 内容渲染 -->
    <div v-if="item.content && item.content.length > 0">
      <div 
        v-for="(line, index) in item.content" 
        :key="index"
        v-memo="[item.id, line, index]"
        class="line content-line"
      >
        {{ line }}
      </div>
    </div>
    
    <!-- 特殊处理：幽梦影的内容作为标题显示 -->
    <div 
      v-if="articleType === 'youmengying' && item.type === 'content'"
      v-memo="[item.id, item.title, articleType]"
      class="line content-title"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<style scoped>
.article-renderer {
  min-height: 60px;
  padding: 0.5rem;
  background: #f9f9f9;
  border: 1px solid #ddd;
  margin: 0.25rem 0;
}

.chapter-title {
  @apply text-4xl font-bold text-red-600 mb-4;
}

.section-title {
  @apply text-3xl font-semibold text-red-500 mb-3;
}

.author-title {
  @apply text-3xl font-semibold text-blue-600 mb-3;
}

.article-title {
  @apply text-2xl font-medium text-gray-800 mb-2;
}

.content-title {
  @apply text-xl font-medium text-gray-700 mb-2;
}

.content-text {
  @apply text-lg text-gray-600 mb-1;
}

.content-line {
  @apply text-base text-gray-600 mb-1 pl-4;
}
</style>
