<script setup lang="ts">
import useArticle from '@/hooks/useArticle'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import type { ArticleType } from '@/hooks/useArticle'
import type { FlattenedItem } from '@/utils/flattenArticles'

const categoryScrollCache = new Map<string, number>()

const route = useRoute()
const router = useRouter()
const articleRef = ref<{ getScrollElement: () => HTMLElement | null } | null>(null)

// 从路由名称获取分类类型
const categoryType = computed(() => {
  const routeName = route.name as string
  const typeMap: Record<string, ArticleType> = {
    'shijing': 'shijing',
    'lunyu': 'lunyu', 
    'yuanqu': 'yuanqu',
    'caocao': 'caocao',
    'youmengying': 'youmengying',
    'sishuwujing': 'sishuwujing',
    'chuci': 'chuci'
  }
  return typeMap[routeName] || 'lunyu'
})

const createCacheKey = (type: ArticleType | string) => `category:${type}`
const scrollCacheKey = computed(() => createCacheKey(categoryType.value))

const getScrollContainer = () => articleRef.value?.getScrollElement?.() ?? null

const saveScrollPosition = () => {
  const container = getScrollContainer()
  if (!container) return
  categoryScrollCache.set(scrollCacheKey.value, container.scrollTop)
}

const restoreScrollPosition = () => {
  const container = getScrollContainer()
  if (!container) return
  const saved = categoryScrollCache.get(scrollCacheKey.value)
  container.scrollTop = saved ?? 0
}

const restoreScrollPositionNextTick = () => {
  nextTick(() => {
    restoreScrollPosition()
  })
}

onActivated(() => {
  restoreScrollPositionNextTick()
})

onDeactivated(() => {
  saveScrollPosition()
})

onBeforeRouteLeave(() => {
  saveScrollPosition()
})

// 获取分类数据
const { flattenedData, loading } = useArticle([], {
  flatten: true,
  articleType: categoryType
})

watch(categoryType, (newType, oldType) => {
  if (oldType) {
    const container = getScrollContainer()
    if (container) {
      categoryScrollCache.set(createCacheKey(oldType), container.scrollTop)
    }
  }
  restoreScrollPositionNextTick()
})

watch(loading, (isLoading) => {
  if (!isLoading) {
    restoreScrollPositionNextTick()
  }
})

// 判断显示类型
const displayType = computed(() => {
  switch (categoryType.value) {
    case 'shijing':
      return 'chapter-section' // 按章节和分类分组
    case 'sishuwujing':
      return 'sishuwujing-sections' // 四书五经按大学、中庸、孟子分组
    case 'yuanqu':
      return 'author-grouped' // 元曲按作者分组
    default:
      return 'direct' // 直接显示
  }
})

// 按作者分组（元曲专用）
const authors = computed(() => {
  if (categoryType.value !== 'yuanqu') return []

  const authorMap: Record<string, { count: number; items: any[] }> = {}

  flattenedData.value.forEach(item => {
    if (item.type === 'author') {
      authorMap[item.title] = {
        count: flattenedData.value.filter(subItem => subItem.parentId === item.id).length,
        items: flattenedData.value.filter(subItem => subItem.parentId === item.id)
      }
    }
  })

  return Object.entries(authorMap).map(([name, data]) => ({
    name,
    count: data.count,
    items: data.items
  }))
})

// 诗经按章节和分类分组
const shijingGroups = computed(() => {
  if (displayType.value !== 'chapter-section') return []
  
  const chapterMap: Record<string, Record<string, any[]>> = {}
  
  flattenedData.value.forEach(item => {
    if (item.type === 'article' && item.data) {
      const chapter = item.data.chapter || '未分类'
      const section = item.data.section || '未分类'
      
      if (!chapterMap[chapter]) {
        chapterMap[chapter] = {}
      }
      if (!chapterMap[chapter][section]) {
        chapterMap[chapter][section] = []
      }
      chapterMap[chapter][section].push(item)
    }
  })
  
  return Object.entries(chapterMap).map(([chapter, sections]) => ({
    chapter,
    sections: Object.entries(sections).map(([section, items]) => ({
      section,
      items
    }))
  }))
})

// 四书五经按大学、中庸、孟子分组
const sishuwujingGroups = computed(() => {
  if (displayType.value !== 'sishuwujing-sections') return []

  const items = flattenedData.value

  const groups = [
    {
      name: '大学',
      items: items.filter(item => item.id === 'daxue-content')
    },
    {
      name: '中庸',
      items: items.filter(item => item.id === 'zhongyong-content')
    },
    {
      name: '孟子',
      items: items.filter(item => item.id.startsWith('mengzi-content-'))
    }
  ]

  return groups.filter(section => section.items.length > 0)
})

// 直接显示的内容
const directContent = computed<FlattenedItem[]>(() => {
  if (displayType.value !== 'direct') return []

  switch (categoryType.value) {
    case 'caocao':
    case 'chuci':
    case 'yuanqu':
      return flattenedData.value.filter(item => item.type === 'article')
    case 'lunyu':
      return flattenedData.value.filter(item => item.type === 'content')
    case 'youmengying':
      return flattenedData.value.filter(item => item.type === 'content')
    default:
      return flattenedData.value
  }
})

const getItemDisplayTitle = (item: FlattenedItem): string => {
  if (!item) return '未命名'

  if (categoryType.value === 'sishuwujing') {
    return item.data?.chapter || item.data?.section || item.title || '四书五经'
  }

  if (categoryType.value === 'lunyu' && item.type === 'content') {
    return item.data?.chapter || '论语章节'
  }

  if (categoryType.value === 'youmengying' && item.type === 'content') {
    return item.title || item.data?.content || '幽梦影'
  }

  if (item.title) return item.title
  if (typeof item.data?.title === 'string' && item.data.title) return item.data.title
  if (typeof item.data?.chapter === 'string' && item.data.chapter) return item.data.chapter
  return '未命名'
}

const getItemPreviewLines = (item: FlattenedItem): string[] => {
  if (Array.isArray(item.content) && item.content.length > 0) {
    if (categoryType.value === 'youmengying') {
      return item.content
    }
    return item.content.slice(0, categoryType.value === 'sishuwujing' ? 6 : 3)
  }

  const data = item.data || {}

  if (Array.isArray(data.paragraphs) && data.paragraphs.length > 0) {
    if (categoryType.value === 'youmengying') {
      return data.paragraphs
    }
    return data.paragraphs.slice(0, categoryType.value === 'sishuwujing' ? 6 : 3)
  }

  if (Array.isArray(data.comment) && data.comment.length > 0) {
    if (categoryType.value === 'youmengying') {
      return data.comment
    }
    return data.comment.slice(0, categoryType.value === 'sishuwujing' ? 6 : 3)
  }

  if (Array.isArray(data.content) && data.content.length > 0) {
    if (categoryType.value === 'youmengying') {
      return data.content
    }
    return data.content.slice(0, categoryType.value === 'sishuwujing' ? 6 : 3)
  }

  if (typeof item.title === 'string' && item.title) {
    return [item.title]
  }

  return []
}

const getItemAuthor = (item: FlattenedItem): string | undefined => {
  if (typeof item.data?.author === 'string' && item.data.author) {
    return item.data.author
  }

  return undefined
}

// 点击作者进入详情（元曲专用）
const handleAuthorClick = (authorName: string) => {
  if (['yuanqu', 'chuci'].includes(categoryType.value)) {
    saveScrollPosition()
    router.push(`/${categoryType.value}/author/${encodeURIComponent(authorName)}`)
  }
}

// 点击内容项进入详情
const handleContentClick = (item: FlattenedItem) => {
  if (!item?.id) return

  if (categoryType.value === 'youmengying') {
    return
  }

  saveScrollPosition()

  const title = getItemDisplayTitle(item)
  const query: Record<string, string> = { id: item.id }

  const author = getItemAuthor(item)
  if (author) {
    query.author = author
  }

  // 根据不同类型处理点击
  switch (categoryType.value) {
    case 'lunyu':
    case 'shijing':
    case 'sishuwujing':
    case 'chuci':
      // 这些分类可能需要显示章节内容，暂时显示内容预览
      if (
        (Array.isArray(item.content) && item.content.length > 0) ||
        (Array.isArray(item.data?.paragraphs) && item.data.paragraphs.length > 0) ||
        (Array.isArray(item.data?.comment) && item.data.comment.length > 0)
      ) {
        router.push({
          path: `/${categoryType.value}/work/${encodeURIComponent(title)}`,
          query
        })
      }
      break
    case 'caocao':
      // 曹操诗集直接跳转到作品详情
      router.push({
        path: `/${categoryType.value}/work/${encodeURIComponent(title)}`,
        query
      })
      break
    default:
      // 默认处理
      if (
        (Array.isArray(item.content) && item.content.length > 0) ||
        (Array.isArray(item.data?.paragraphs) && item.data.paragraphs.length > 0) ||
        (Array.isArray(item.data?.comment) && item.data.comment.length > 0)
      ) {
        router.push({
          path: `/${categoryType.value}/work/${encodeURIComponent(title)}`,
          query
        })
      }
  }
}

// 获取分类标题
const getCategoryTitle = (type: ArticleType) => {
  const titles: Record<ArticleType, string> = {
    yuanqu: '元曲',
    shijing: '诗经',
    lunyu: '论语',
    caocao: '曹操诗集',
    youmengying: '幽梦影',
    sishuwujing: '四书五经',
    chuci: '楚辞'
  }
  return titles[type] || '古典文学'
}
</script>

<template>
  <Article ref="articleRef" :loading="loading">
    <div class="category-page">
      <header class="category-header">
        <h1 class="category-title">{{ getCategoryTitle(categoryType) }}</h1>
        <p class="category-description">
          <span v-if="displayType === 'author-grouped'">
            共收录 {{ authors.length }} 位作者，{{ flattenedData.filter(item => item.type === 'article').length }} 篇作品
          </span>
          <span v-else-if="displayType === 'chapter-section'">
            共收录 {{ shijingGroups.length }} 个章节，{{ flattenedData.length }} 篇作品
          </span>
          <span v-else-if="displayType === 'sishuwujing-sections'">
            共收录 {{ sishuwujingGroups.length }} 个部分，{{ flattenedData.length }} 篇作品
          </span>
          <span v-else>
            共收录 {{ directContent.length }} 篇作品
          </span>
        </p>
      </header>

      <!-- 元曲按作者分组显示 -->
      <div v-if="displayType === 'author-grouped' && authors.length > 0" class="authors-grid">
        <div
          v-for="author in authors"
          :key="author.name"
          class="author-card"
          @click="handleAuthorClick(author.name)"
        >
          <div class="card-header">
            <h3 class="author-name">{{ author.name }}</h3>
            <span class="works-count">{{ author.count }} 篇作品</span>
          </div>

          <div class="card-preview">
            <div
              v-for="(item, index) in author.items.slice(0, 3)"
              :key="index"
              class="preview-item"
            >
              <span class="item-title">{{ item.title }}</span>
            </div>
            <div v-if="author.items.length > 3" class="more-items">
              还有 {{ author.items.length - 3 }} 篇作品...
            </div>
          </div>
        </div>
      </div>

      <!-- 四书五经按大学、中庸、孟子分组显示 -->
      <div v-if="displayType === 'sishuwujing-sections' && sishuwujingGroups.length > 0" class="sishuwujing-groups">
        <div
          v-for="section in sishuwujingGroups"
          :key="section.name"
          class="sishuwujing-section"
        >
          <h2 class="section-title">{{ section.name }}</h2>
          <div class="section-content">
            <div
              v-for="item in section.items"
              :key="item.id"
              class="content-item"
              @click="handleContentClick(item)"
            >
              <h4 class="item-title">{{ getItemDisplayTitle(item) }}</h4>
              <div class="item-preview" v-if="getItemPreviewLines(item).length > 0">
                <p v-for="(line, index) in getItemPreviewLines(item)" :key="index">
                  {{ line }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 诗经按章节和分类显示 -->
      <div v-else-if="displayType === 'chapter-section' && shijingGroups.length > 0" class="shijing-groups">
        <div
          v-for="group in shijingGroups"
          :key="group.chapter"
          class="chapter-group"
        >
          <h2 class="chapter-title">{{ group.chapter }}</h2>
          <div class="sections-grid">
            <div
              v-for="section in group.sections"
              :key="section.section"
              class="section-card"
            >
              <h3 class="section-title">{{ section.section }}</h3>
              <div class="section-items">
                <div
                  v-for="item in section.items"
                  :key="item.id"
                  class="poem-item"
                  @click="handleContentClick(item)"
                >
                  <span class="poem-title">{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 直接显示内容（其他分类） -->
      <div v-else-if="displayType === 'direct' && directContent.length > 0" class="content-list">
        <div
          v-for="item in directContent"
          :key="item.id"
          :class="['content-item', { 'is-static': categoryType === 'youmengying' }]"
          @click="categoryType !== 'youmengying' && handleContentClick(item)"
        >
          <h4 class="item-title">{{ getItemDisplayTitle(item) }}</h4>
          <div class="item-preview" v-if="getItemPreviewLines(item).length > 0">
            <p v-for="(line, index) in getItemPreviewLines(item)" :key="index">
              {{ line }}
            </p>
          </div>
        </div>
      </div>

      <!-- 无内容提示 -->
      <div v-else class="no-content">
        <p>暂无内容</p>
      </div>
    </div>
  </Article>
</template>

<style scoped lang="scss">
.category-page {
  max-width: 1200px;
  margin: 0 auto;
}

.category-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid #d4af37;
}

.category-title {
  font-size: 3rem;
  color: #8b2635;
  margin-bottom: 1rem;
  letter-spacing: 6px;
  font-weight: 600;
}

.category-description {
  font-size: 1.2rem;
  color: #6b1c28;
  letter-spacing: 2px;
}

.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.author-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 38, 53, 0.15);
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(139, 38, 53, 0.15);
    border-color: #d4af37;

    .author-name {
      color: #d4af37;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8d5d8;
}

.author-name {
  font-size: 1.5rem;
  color: #8b2635;
  margin: 0;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.works-count {
  font-size: 0.9rem;
  color: #6b1c28;
  background: rgba(139, 38, 53, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
}

.card-preview {
  .preview-item {
    margin-bottom: 0.8rem;
    padding: 0.5rem 0;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    transition: all 0.3s ease;

    &:hover {
      border-left-color: #d4af37;
      background: rgba(212, 175, 55, 0.05);
    }
  }

  .item-title {
    color: #3e2723;
    font-size: 1rem;
    letter-spacing: 1px;
  }

  .more-items {
    color: #8b8680;
    font-size: 0.9rem;
    font-style: italic;
    margin-top: 1rem;
    text-align: center;
  }
}

.content-list {
  display: grid;
  gap: 2rem;
}

.content-item {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 38, 53, 0.15);
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 38, 53, 0.15);
    border-color: #d4af37;

    .item-title {
      color: #d4af37;
    }
  }

  &.is-static {
    cursor: default;

    &:hover {
      transform: none;
      box-shadow: none;
      border-color: rgba(139, 38, 53, 0.15);

      .item-title {
        color: #8b2635;
      }
    }
  }
}

.no-content {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b1c28;
  font-size: 1.1rem;
}

// 四书五经分组显示样式
.sishuwujing-groups {
  display: grid;
  gap: 3rem;
}

.sishuwujing-section {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 38, 53, 0.15);
  border-radius: 12px;
  padding: 2rem;
}

.sishuwujing-section .section-title {
  font-size: 2rem;
  color: #8b2635;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 3px;
  font-weight: 600;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 1rem;
}

.section-content {
  display: grid;
  gap: 1.5rem;
}

// 诗经分组显示样式
.shijing-groups {
  display: grid;
  gap: 3rem;
}

.chapter-group {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 38, 53, 0.15);
  border-radius: 12px;
  padding: 2rem;
}

.chapter-title {
  font-size: 2rem;
  color: #8b2635;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 3px;
  font-weight: 600;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 1rem;
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.section-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(139, 38, 53, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(139, 38, 53, 0.1);
    border-color: #d4af37;
  }
}

.section-title {
  font-size: 1.3rem;
  color: #8b2635;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid #e8d5d8;
  padding-bottom: 0.5rem;
}

.section-items {
  display: grid;
  gap: 0.8rem;
}

.poem-item {
  padding: 0.8rem 1rem;
  background: rgba(139, 38, 53, 0.05);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;

  &:hover {
    background: rgba(212, 175, 55, 0.1);
    border-left-color: #d4af37;
    transform: translateX(4px);

    .poem-title {
      color: #d4af37;
    }
  }
}

.poem-title {
  color: #3e2723;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .sections-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .chapter-title {
    font-size: 1.6rem;
    letter-spacing: 2px;
  }

  .section-card {
    padding: 1rem;
  }

  .authors-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .category-title {
    font-size: 2.2rem;
    letter-spacing: 4px;
  }

  .author-card {
    padding: 1.5rem;
  }
}

.item-title {
  font-size: 1.3rem;
  color: #8b2635;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}

// 作者卡片样式（元曲专用）
.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.author-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 38, 53, 0.15);
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(139, 38, 53, 0.15);
    border-color: #d4af37;

    .author-name {
      color: #d4af37;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8d5d8;
}

.author-name {
  font-size: 1.5rem;
  color: #8b2635;
  margin: 0;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.works-count {
  font-size: 0.9rem;
  color: #6b1c28;
  background: rgba(139, 38, 53, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
}

.card-preview {
  .preview-item {
    margin-bottom: 0.8rem;
    padding: 0.5rem 0;
    border-left: 3px solid transparent;
    padding-left: 1rem;
    transition: all 0.3s ease;

    &:hover {
      border-left-color: #d4af37;
      background: rgba(212, 175, 55, 0.05);
    }
  }

  .item-title {
    color: #3e2723;
    font-size: 1rem;
    letter-spacing: 1px;
  }

  .more-items {
    color: #8b8680;
    font-size: 0.9rem;
    font-style: italic;
    margin-top: 1rem;
    text-align: center;
  }
}

.item-preview {
  color: #3e2723;
  line-height: 1.8;

  p {
    margin: 0.5rem 0;
    letter-spacing: 1px;
  }
}

@media (max-width: 768px) {
  .authors-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .category-title {
    font-size: 2.2rem;
    letter-spacing: 4px;
  }

  .author-card {
    padding: 1.5rem;
  }
}
</style>
