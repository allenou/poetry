<script setup lang="ts">
import request from "@/utils/request";
import { PATHS } from "@/config";
import { flattenSiShuWuJing } from "@/utils/flattenArticles";
import type { TMenZi, TSiShuWuJing } from "@/typings";

const loading = ref(false)
const flattenedData = ref<any[]>([])

onMounted(async () => {
  loading.value = true
  
  try {
    const [daxue, zhongyong, mengzi] = await Promise.all([
      request<TSiShuWuJing>(PATHS.daxue) || { chapter: '', paragraphs: [] },
      request<TSiShuWuJing>(PATHS.zhongyong) || { chapter: '', paragraphs: [] },
      request<TMenZi[]>(PATHS.mengzi) || []
    ])
    
    // 扁平化数据
    flattenedData.value = flattenSiShuWuJing({ 
      daxue: daxue || { chapter: '', paragraphs: [] }, 
      zhongyong: zhongyong || { chapter: '', paragraphs: [] }, 
      mengzi: mengzi || [] 
    })
  } catch (error) {
    console.error('加载四书五经数据失败:', error)
  } finally {
    loading.value = false
  }
})
</script>
  
<template>
  <Article :loading="loading">
    <VirtualList 
      v-if="!loading"
      :items="flattenedData"
      article-type="sishuwujing"
      :container-height="600"
      :item-height="100"
    />
  </Article>
</template>