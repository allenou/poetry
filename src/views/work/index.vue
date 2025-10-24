<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const workTitle = decodeURIComponent(route.params.workTitle as string)
const authorName = route.query.author as string
const content = JSON.parse(route.query.content as string || '[]')

// 返回作者页面
const goBackToAuthor = () => {
  if (authorName) {
    router.push(`/${route.params.type}/author/${encodeURIComponent(authorName)}`)
  } else {
    router.back()
  }
}

// 返回分类页面
const goBackToCategory = () => {
  router.push(`/${route.params.type}`)
}
</script>

<template>
  <Article :loading="false">
    <div class="work-detail-page">
      <header class="work-header">
        <div class="breadcrumb">
          <button class="breadcrumb-btn" @click="goBackToCategory">
            {{ route.params.type === 'yuanqu' ? '元曲' : '分类' }}
          </button>
          <span class="breadcrumb-separator">›</span>
          <button v-if="authorName" class="breadcrumb-btn" @click="goBackToAuthor">
            {{ authorName }}
          </button>
          <span v-if="authorName" class="breadcrumb-separator">›</span>
          <span class="current-title">{{ workTitle }}</span>
        </div>

        <h1 class="work-title">{{ workTitle }}</h1>
        <p v-if="authorName" class="work-author">作者：{{ authorName }}</p>
      </header>

      <div class="work-content">
        <div
          v-for="(line, index) in content"
          :key="index"
          class="content-line"
        >
          {{ line }}
        </div>
      </div>

      <footer class="work-footer">
        <div class="decoration">
          <span class="decoration-symbol">❦</span>
        </div>
      </footer>
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