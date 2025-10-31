<script setup lang="ts">
import { useVirtualArticleList } from '@/hooks/useVirtualArticleList'
import type { FlattenedItem } from '@/utils/flattenArticles'

interface Props {
  items: FlattenedItem[]
  articleType: 'lunyu' | 'shijing' | 'yuanqu' | 'caocao' | 'youmengying' | 'sishuwujing' | 'chuci'
  containerHeight?: number
  itemHeight?: number
  overscan?: number
}

const props = withDefaults(defineProps<Props>(), {
  containerHeight: 600,
  itemHeight: 80,
  overscan: 5
})

// 使用虚拟列表 hook
const {
  list,
  containerProps,
  wrapperProps,
  scrollToIndex,
  scrollToTop,
  scrollToBottom
} = useVirtualArticleList(
  toRef(props, 'items'),
  {
    containerHeight: props.containerHeight,
    itemHeight: props.itemHeight,
    overscan: props.overscan
  }
)

// 暴露方法给父组件
defineExpose({
  scrollToIndex,
  scrollToTop,
  scrollToBottom
})
</script>

<template>
  <div
    v-bind="containerProps"
    class="virtual-list-container"
    :style="{ height: `${containerHeight}px` }"
  >
    <div v-bind="wrapperProps">
      <div
        v-for="{ data: item, index } in list"
        :key="`item-${index}`"
        class="virtual-list-item"
      >
        <ArticleRenderer 
          :item="item" 
          :article-type="articleType"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-list-container {
  @apply overflow-auto border-2 border-red-500;
  max-height: 95vh;
}

.virtual-list-item {
  padding: 0.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.25rem;
}
</style>
