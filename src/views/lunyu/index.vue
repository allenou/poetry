<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TLunYu } from "@/typings";

const { data: articles, loading } = useArticle<TLunYu[]>([])
</script>

<template>
  <Article :loading="loading">
    <section v-for="(article, i) in articles" :key="i">
      <div class="line">
        <h4>
          {{ article.chapter }}
        </h4>
      </div>
      <div class="line" v-for="(line, j) in article.paragraphs" :key="j">
        {{ line }}
      </div>
    </section>
  </Article>
</template>
