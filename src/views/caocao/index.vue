<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TCaoCao } from "@/typings";

const { flattenedData, loading } = useArticle<TCaoCao[]>([], { 
  flatten: true, 
  articleType: 'caocao' 
})
</script>

<template>
  <Article :loading="loading">
    <VirtualList 
      v-if="!loading"
      :items="flattenedData"
      article-type="caocao"
      :container-height="600"
      :item-height="100"
    />
  </Article>
</template>