<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TYuanQu } from "@/typings";

const { flattenedData, loading } = useArticle<TYuanQu[]>([], { 
  flatten: true, 
  articleType: 'yuanqu' 
})
</script>

<template>
  <Article :loading="loading">
    <VirtualList 
      v-if="!loading"
      :items="flattenedData"
      article-type="yuanqu"
      :container-height="600"
      :item-height="100"
    />
  </Article>
</template>