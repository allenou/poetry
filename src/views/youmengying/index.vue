<script setup lang="ts">
import useArticle from '@/hooks/useArticle'
import type { ArticleType } from '@/hooks/useArticle'
import type { FlattenedItem } from '@/utils/flattenArticles'

// 获取幽梦影数据
const { flattenedData, loading } = useArticle([], {
  flatten: true,
  articleType: 'youmengying'
})

const getCommentLines = (item: FlattenedItem): string[] => {
  if (Array.isArray(item.content) && item.content.length > 0) {
    return item.content
  }

  const data = item.data || {}

  if (Array.isArray(data.comment) && data.comment.length > 0) {
    return data.comment
  }

  if (Array.isArray(data.paragraphs) && data.paragraphs.length > 0) {
    return data.paragraphs
  }

  return []
}
</script>

<template>
  <Article :loading="loading">
    <div class="youmengying-page">
      <header class="youmengying-header">
        <h1 class="youmengying-title">幽梦影</h1>
        <p class="youmengying-description">
          共收录 {{ flattenedData.length }} 篇内容
        </p>
      </header>

      <div class="content-list" v-if="flattenedData.length > 0">
        <div
          v-for="item in flattenedData"
          :key="item.id"
          class="content-item"
        >
          <h4 class="item-title">{{ item.title }}</h4>
          <div v-if="getCommentLines(item).length > 0" class="item-preview">
            <p v-for="(line, index) in getCommentLines(item)" :key="index">
              {{ line }}
            </p>
          </div>
        </div>
      </div>

      <div v-else class="no-content">
        <p>暂无内容</p>
      </div>
    </div>
  </Article>
</template>

<style scoped lang="scss">
.youmengying-page {
  max-width: 1200px;
  margin: 0 auto;
}

.youmengying-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid #d4af37;
}

.youmengying-title {
  font-size: 3rem;
  color: #8b2635;
  margin-bottom: 1rem;
  letter-spacing: 6px;
  font-weight: 600;
}

.youmengying-description {
  font-size: 1.2rem;
  color: #6b1c28;
  letter-spacing: 2px;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 38, 53, 0.15);
    border-color: #d4af37;
  }
}

.item-title {
  font-size: 1.3rem;
  color: #8b2635;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.item-preview {
  color: #3e2723;
  line-height: 1.8;

  p {
    margin: 0.5rem 0;
    letter-spacing: 1px;
  }
}

.no-content {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b1c28;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .youmengying-title {
    font-size: 2.2rem;
    letter-spacing: 4px;
  }

  .content-item {
    padding: 1.5rem;
  }
}
</style>
