<script setup lang="ts">
import useArticle, { type ArticleType } from '@/hooks/useArticle'
import type { FlattenedItem } from '@/utils/flattenArticles'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const categoryType = computed<ArticleType>(() => (route.params.type as ArticleType) || 'lunyu')
const rawRouteTitle = computed(() => decodeURIComponent((route.params.workTitle as string) || ''))
const authorFromQuery = computed(() => {
  const author = route.query.author
  const value = Array.isArray(author) ? author[0] : author
  return value ? String(value) : ''
})
const targetId = computed(() => {
  const raw = route.query.id
  const value = Array.isArray(raw) ? raw[0] : raw
  return value ? String(value) : ''
})

const { flattenedData, loading } = useArticle<FlattenedItem[]>([], {
  flatten: true,
  articleType: categoryType
})

const workItem = computed<FlattenedItem | undefined>(() => {
  if (!targetId.value) return undefined
  return flattenedData.value.find(item => item.id === targetId.value)
})

const displayTitle = computed(() => {
  if (!workItem.value) {
    return rawRouteTitle.value
  }

  if (categoryType.value === 'lunyu') {
    return workItem.value.data?.chapter || workItem.value.title || rawRouteTitle.value
  }

  if (categoryType.value === 'youmengying') {
    return workItem.value.title || workItem.value.data?.content || rawRouteTitle.value
  }

  return workItem.value.title || workItem.value.data?.title || rawRouteTitle.value
})

const authorLabel = computed(() => {
  if (authorFromQuery.value) {
    return authorFromQuery.value
  }

  if (!workItem.value) {
    return ''
  }

  if (typeof workItem.value.data?.author === 'string') {
    return workItem.value.data.author
  }

  if (categoryType.value === 'caocao') {
    return '曹操'
  }

  return ''
})

const enableAuthorLink = computed(() => {
  if (!authorLabel.value) return false
  if (['caocao', 'youmengying'].includes(categoryType.value)) return false
  return true
})

const contentLines = computed(() => {
  if (!workItem.value) {
    return []
  }

  if (Array.isArray(workItem.value.content) && workItem.value.content.length > 0) {
    return workItem.value.content
  }

  const data = workItem.value.data || {}

  if (Array.isArray(data.paragraphs) && data.paragraphs.length > 0) {
    return data.paragraphs
  }

  if (Array.isArray(data.comment) && data.comment.length > 0) {
    return data.comment
  }

  if (Array.isArray(data.content) && data.content.length > 0) {
    return data.content
  }

  if (typeof workItem.value.title === 'string' && workItem.value.title) {
    return [workItem.value.title]
  }

  return []
})

// 返回作者页面
const goBackToAuthor = () => {
  if (enableAuthorLink.value) {
    router.push(`/${categoryType.value}/author/${encodeURIComponent(authorLabel.value)}`)
  } else {
    router.back()
  }
}

// 返回分类页面
const goBackToCategory = () => {
  router.push(`/${categoryType.value}`)
}
</script>

<template>
  <Article :loading="loading">
    <div v-if="workItem || loading" class="work-detail-page">
      <header class="work-header">
        <div class="breadcrumb">
          <button class="breadcrumb-btn" @click="goBackToCategory">
            {{ categoryType === 'yuanqu' ? '元曲' : '分类' }}
          </button>
          <span class="breadcrumb-separator">›</span>
          <button v-if="enableAuthorLink" class="breadcrumb-btn" @click="goBackToAuthor">
            {{ authorLabel }}
          </button>
          <span v-else-if="authorLabel" class="breadcrumb-text">{{ authorLabel }}</span>
          <span v-if="authorLabel" class="breadcrumb-separator">›</span>
          <span class="current-title">{{ displayTitle }}</span>
        </div>

        <h1 class="work-title">{{ displayTitle }}</h1>
        <p v-if="authorLabel" class="work-author">作者：{{ authorLabel }}</p>
      </header>

      <div v-if="contentLines.length > 0" class="work-content">
        <div
          v-for="(line, index) in contentLines"
          :key="index"
          class="content-line"
        >
          {{ line }}
        </div>
      </div>
      <div v-else-if="!loading" class="no-content">
        <p>暂未找到该作品的正文内容。</p>
      </div>

      <footer class="work-footer">
        <div class="decoration">
          <span class="decoration-symbol">❦</span>
        </div>
      </footer>
    </div>
    <div v-else class="work-detail-page">
      <div class="no-content">
        <p v-if="!targetId">未提供作品标识，无法加载内容。</p>
        <p v-else>未找到对应作品，可能已被移除。</p>
      </div>
    </div>
  </Article>
</template>

<style scoped lang="scss">
.work-detail-page {
  max-width: 800px;
  margin: 0 auto;
}

.work-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #d4af37;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb-btn {
  background: none;
  border: none;
  color: #8b2635;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 38, 53, 0.1);
    color: #d4af37;
  }
}

.breadcrumb-separator {
  color: #8b8680;
  margin: 0 0.5rem;
}

.breadcrumb-text {
  color: #8b8680;
  margin-right: 0.5rem;
}

.current-title {
  color: #6b1c28;
  font-weight: 500;
}

.work-title {
  font-size: 2.5rem;
  color: #8b2635;
  margin: 1rem 0;
  letter-spacing: 4px;
  text-align: center;
  font-weight: 600;
}

.work-author {
  font-size: 1.2rem;
  color: #6b1c28;
  text-align: center;
  letter-spacing: 2px;
  margin: 0;
}

.work-content {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 38, 53, 0.1);
  border-radius: 12px;
  padding: 3rem 4rem;
  margin: 2rem 0;
  position: relative;
}

.work-content::before {
  content: '';
  position: absolute;
  top: 15px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  border: 1px solid rgba(139, 38, 53, 0.08);
  border-radius: 8px;
  pointer-events: none;
}

.content-line {
  font-size: 1.3rem;
  line-height: 2.2;
  color: #3e2723;
  margin-bottom: 1.2rem;
  text-align: center;
  letter-spacing: 2px;
  padding: 0.5rem 0;
  border-bottom: 1px dashed transparent;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 38, 53, 0.03);
    border-bottom-color: #e8d5d8;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.no-content {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b1c28;
  letter-spacing: 1px;
}

.work-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e8d5d8;
}

.decoration-symbol {
  font-size: 2rem;
  color: #d4af37;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .work-content {
    padding: 2rem 2.5rem;
  }

  .work-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .content-line {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }
}

@media (max-width: 480px) {
  .work-content {
    padding: 1.5rem 2rem;
  }

  .work-title {
    font-size: 1.8rem;
  }
}
</style>
