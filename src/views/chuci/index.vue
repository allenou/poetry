<script setup lang="ts">
import useArticle from '@/hooks/useArticle'
import { useRouter } from 'vue-router'
import type { TChuCi } from '@/typings'
import type { FlattenedItem } from '@/utils/flattenArticles'

const router = useRouter()

const { flattenedData, loading } = useArticle<TChuCi[]>([], {
  flatten: true,
  articleType: 'chuci'
})

const works = computed(() =>
  flattenedData.value.filter(item => item.type === 'article')
)

const getPreviewLines = (item: FlattenedItem) => {
  if (Array.isArray(item.content) && item.content.length > 0) {
    return item.content.slice(0, 3)
  }

  const paragraphs = item.data?.paragraphs
  if (Array.isArray(paragraphs) && paragraphs.length > 0) {
    return paragraphs.slice(0, 3)
  }

  return []
}

const handleWorkClick = (item: FlattenedItem) => {
  if (!item?.id) return

  const query: Record<string, string> = { id: item.id }
  if (item.data?.author) {
    query.author = item.data.author
  }

  router.push({
    path: `/chuci/work/${encodeURIComponent(item.title || item.id)}`,
    query
  })
}
</script>

<template>
  <Article :loading="loading">
    <header class="chuci-header">
      <h1 class="chuci-title">楚辞</h1>
      <p class="chuci-description">
        屈原等人的楚辞作品集合，点击条目可查看全文。
      </p>
    </header>

    <div v-if="!loading && works.length > 0" class="work-list">
      <div
        v-for="item in works"
        :key="item.id"
        class="work-card"
        @click="handleWorkClick(item)"
      >
        <div class="work-card__header">
          <h3 class="work-card__title">{{ item.title }}</h3>
          <span v-if="item.data?.author" class="work-card__author">
            作者：{{ item.data.author }}
          </span>
        </div>
        <div v-if="getPreviewLines(item).length > 0" class="work-card__preview">
          <p
            v-for="(line, index) in getPreviewLines(item)"
            :key="index"
          >
            {{ line }}
          </p>
        </div>
        <!-- <div class="work-card__meta">
          预览前 {{ getPreviewLines(item).length }} 行 · 点击查看全文
        </div> -->
      </div>
    </div>

    <div v-else-if="!loading" class="empty-state">
      暂无楚辞数据。
    </div>
  </Article>
</template>

<style scoped lang="scss">
.chuci-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(139, 38, 53, 0.2);
}

.chuci-title {
  font-size: 2.8rem;
  color: #8b2635;
  margin-bottom: 0.5rem;
  letter-spacing: 6px;
  font-weight: 600;
}

.chuci-description {
  font-size: 1.1rem;
  color: #6b1c28;
  letter-spacing: 2px;
}

.work-list {
  display: grid;
  gap: 1.5rem;
}

.work-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(139, 38, 53, 0.12);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(139, 38, 53, 0.15);
    border-color: #d4af37;
  }
}

.work-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.work-card__title {
  font-size: 1.6rem;
  color: #8b2635;
  margin: 0;
  letter-spacing: 3px;
}

.work-card__author {
  font-size: 0.95rem;
  color: #6b1c28;
  background: rgba(139, 38, 53, 0.08);
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
}

.work-card__preview {
  color: #3e2723;
  line-height: 1.8;
  letter-spacing: 1px;

  p {
    margin: 0.4rem 0;
  }
}

.work-card__meta {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #a67c52;
  letter-spacing: 1px;
}

.empty-state {
  text-align: center;
  color: #6b1c28;
  padding: 3rem 0;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .work-card {
    padding: 1.2rem 1.5rem;
  }

  .work-card__title {
    font-size: 1.4rem;
  }
}
</style>
