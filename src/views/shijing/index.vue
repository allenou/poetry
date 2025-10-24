<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TShiJing } from "@/typings";

const { flattenedData, loading } = useArticle<TShiJing[]>([], { 
  flatten: true, 
  articleType: 'shijing' 
})
</script>
  
<template>
  <Article :loading="loading">
    <VirtualList 
      v-if="!loading && flattenedData.length > 0"
      :items="flattenedData"
      article-type="shijing"
      :container-height="600"
      :item-height="120"
    />
  </Article>
</template>