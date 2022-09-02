<script setup lang="ts">
import useArticle from "@/hooks/useArticle";

const { data: articles, loading } = useArticle()
</script>

<template>
  <Article :loading="loading">
    <section v-for="(article, i) in articles" :key="i">
      <h1>
        {{ article.content }}
      </h1>
      <p v-for="(line, j) in article.comment" :key="j">
        {{ line }}
      </p>
    </section>
  </Article>
</template>