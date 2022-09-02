<script setup lang="ts">
import useArticle from "@/hooks/useArticle";

const { data, loading } = useArticle()


</script>

<template>
  <Article :loading="loading">
    <section v-for="(article, i) in data" :key="i">
      <h1>
        {{ article.title }}
      </h1>
      <p v-for="(line, j) in article.paragraphs" :key="j">
      <p> {{ line }}</p>
      </p>
    </section>
  </Article>
</template>

