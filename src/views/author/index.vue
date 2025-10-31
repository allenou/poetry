<script setup lang="ts">
import useArticle from '@/hooks/useArticle'
import { useRoute, useRouter } from 'vue-router'
import type { ArticleType } from '@/hooks/useArticle'
import usePinyin from '@/hooks/usePinyin'
import PinyinLine from '@/components/PinyinLine.vue'

const route = useRoute()
const router = useRouter()
const categoryType = computed<ArticleType>(() => (route.params.type as ArticleType) || 'lunyu')
const authorName = computed(() => decodeURIComponent((route.params.authorName as string) || ''))

// 获取该作者的所有作品
const { flattenedData, loading } = useArticle([], {
  flatten: true,
  articleType: categoryType
})

// 过滤出该作者的作品
const authorWorks = computed(() => {
  // 找到该作者的作品（扁平化数据中type为'article'且父级是作者的数据）
  const authorItem = flattenedData.value.find(item =>
    item.type === 'author' && item.title === authorName.value
  )

  if (!authorItem) return []

  // 获取该作者的所有作品
  return flattenedData.value.filter(item =>
    item.parentId === authorItem.id && item.type === 'article'
  )
})

// 点击作品查看详情
const handleWorkClick = (work: any) => {
  // 这里可以导航到作品详情页，或者展开显示内容
  router.push({
    path: `/${categoryType.value}/work/${encodeURIComponent(work.title || work.id)}`,
    query: {
      id: work.id,
      author: authorName.value,
    }
  })
}

// 返回分类页面
const goBackToCategory = () => {
  router.push(`/${categoryType.value}`)
}

const { enabled: pinyinEnabled } = usePinyin()
</script>

<template>
  <Article :loading="loading">
    <div class="author-detail-page">
      <header class="author-header">
        <button class="back-btn" @click="goBackToCategory">
          ← 返回{{ categoryType === 'yuanqu' ? '元曲' : '分类' }}
        </button>
        <h1 class="author-name">{{ authorName }}</h1>
        <p class="works-info">
          共收录 {{ authorWorks.length }} 篇作品
        </p>
      </header>

      <div class="works-list" v-if="authorWorks.length > 0">
        <div
          v-for="work in authorWorks"
          :key="work.id"
          class="work-item"
          @click="handleWorkClick(work)"
        >
          <div class="work-header">
            <h3 class="work-title">{{ work.title }}</h3>
            <span class="work-type">{{ categoryType === 'yuanqu' ? '元曲' : '作品' }}</span>
          </div>

          <div class="work-content-preview">
            <div
              v-for="(line, index) in (work.content || []).slice(0, 4)"
              :key="index"
              class="content-line"
            >
              <PinyinLine :text="line" :enabled="pinyinEnabled" />
            </div>
            <div v-if="(work.content || []).length > 4" class="more-content">
              ... 还有 {{ (work.content || []).length - 4 }} 行
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-works">
        <p>暂无该作者的作品信息</p>
      </div>
    </div>
  </Article>
</template>

<style scoped lang="scss">
.author-detail-page {
  max-width: 1000px;
  margin: 0 auto;
}

.author-header {
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid #d4af37;
  position: relative;
}

.back-btn {
  background: none;
  border: 1px solid #8b2635;
  color: #8b2635;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: #8b2635;
    color: white;
  }
}

.author-name {
  font-size: 2.5rem;
  color: #8b2635;
  margin: 1rem 0;
  letter-spacing: 4px;
  font-weight: 600;
}

.works-info {
  font-size: 1.1rem;
  color: #6b1c28;
  letter-spacing: 2px;
}

.works-list {
  display: grid;
  gap: 2rem;
}

.work-item {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 38, 53, 0.15);
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 38, 53, 0.15);
    border-color: #d4af37;

    .work-title {
      color: #d4af37;
    }
  }
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8d5d8;
}

.work-title {
  font-size: 1.4rem;
  color: #8b2635;
  margin: 0;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.work-type {
  font-size: 0.9rem;
  color: #6b1c28;
  background: rgba(139, 38, 53, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
}

.work-content-preview {
  color: #3e2723;
  line-height: 1.8;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.content-line {
  margin-bottom: 0.8rem;
  padding: 0.3rem 0;
  border-left: 3px solid transparent;
  padding-left: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-left-color: #d4af37;
    background: rgba(212, 175, 55, 0.05);
  }
}

.more-content {
  color: #8b8680;
  font-style: italic;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.no-works {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b1c28;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .author-name {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .work-item {
    padding: 1.5rem;
  }

  .work-title {
    font-size: 1.2rem;
  }
}
</style>
