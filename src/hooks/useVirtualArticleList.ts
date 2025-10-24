import { useVirtualList, useThrottleFn } from '@vueuse/core'
import type { FlattenedItem } from '@/utils/flattenArticles'

export interface UseVirtualArticleListOptions {
  containerHeight?: number
  itemHeight?: number
  overscan?: number
  throttleMs?: number
}

export function useVirtualArticleList(
  items: Ref<FlattenedItem[]>,
  options: UseVirtualArticleListOptions = {}
) {
  const {
    containerHeight = 600,
    itemHeight = 80,
    overscan = 5,
    throttleMs = 16 // 约60fps
  } = options

  // 使用 VueUse 的 useVirtualList
  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
    items,
    {
      itemHeight,
      overscan
    }
  )

  // 滚动到指定项
  const scrollToIndex = (index: number) => {
    scrollTo(index)
  }

  // 滚动到顶部
  const scrollToTop = () => {
    scrollTo(0)
  }

  // 滚动到底部
  const scrollToBottom = () => {
    scrollTo(items.value.length - 1)
  }

  // 查找指定类型的项
  const findItemsByType = (type: FlattenedItem['type']) => {
    return items.value.filter(item => item.type === type)
  }

  // 查找指定层级的项
  const findItemsByLevel = (level: number) => {
    return items.value.filter(item => item.level === level)
  }

  // 获取当前可见的项
  const getVisibleItems = () => {
    return list.value.map(item => item.data)
  }

  return {
    // 虚拟列表核心数据
    list,
    containerProps,
    wrapperProps,
    
    // 方法
    scrollToIndex,
    scrollToTop,
    scrollToBottom,
    findItemsByType,
    findItemsByLevel,
    getVisibleItems
  }
}
