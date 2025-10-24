<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TCaoCao } from "@/typings";
const { data, loading } = useArticle<TCaoCao[]>([])
</script>

<template>
  <Article :loading="loading">
    <section v-for="(article, i) in data">
      <div class="line">
        <h4>{{ article.title }}</h4>
      </div>
      <div class="line" v-for="(line, j) in article.paragraphs"> {{ line }}</div>
    </section>
  </Article>
</template>