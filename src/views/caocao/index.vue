<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
const { data, loading } = useArticle()
</script>

<template>
  <Article :loading="loading">
    <section v-for="(article, i) in data">
      <div class="line" @click="article.title">
        <h4>{{ article.title }}</h4>
      </div>
      <div class="line" v-for="(line, j) in article.paragraphs"> {{ line }}</div>
    </section>
  </Article>
</template>