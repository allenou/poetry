<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TLunYu } from "@/typings";

const { flattenedData, loading } = useArticle<TLunYu[]>([], { 
  flatten: true, 
  articleType: 'lunyu' 
})

</script>

<template>
  <Article :loading="loading">
    <VirtualList 
      v-if="!loading && flattenedData.length > 0"
      :items="flattenedData"
      article-type="lunyu"
      :container-height="600"
      :item-height="100"
    />
  </Article>
</template>
