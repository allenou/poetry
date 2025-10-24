<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TYouMengYing } from "@/typings";

const { data: articles, loading } = useArticle<TYouMengYing[]>([])
</script>

<template>
  <Article :loading="loading">
    <section v-for="(article, i) in articles" :key="i">
      <div class="line">
        <h4>
          {{ article.content }}
        </h4>
      </div>
      <div class="line" v-for="(line, j) in article.comment" :key="j">
        {{ line }}
      </div>
    </section>
  </Article>
</template>