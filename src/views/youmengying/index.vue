<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TYouMengYing } from "@/typings";

const { flattenedData, loading } = useArticle<TYouMengYing[]>([], { 
  flatten: true, 
  articleType: 'youmengying' 
})
</script>

<template>
  <Article :loading="loading">
    <VirtualList 
      v-if="!loading"
      :items="flattenedData"
      article-type="youmengying"
      :container-height="600"
      :item-height="100"
    />
  </Article>
</template>