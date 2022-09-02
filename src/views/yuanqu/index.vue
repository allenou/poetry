<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TAuthor } from "@/typings";

const { data: articles, loading } = useArticle()

const yuanqu = computed(() => {
  let authors: TAuthor = {}
  for (let article of articles.value || []) {
    if (!authors[article.author]) {
      authors[article.author] = [article]
      continue
    }
    authors[article.author].push(article)
  }
  return authors
})

</script>

<template>
  <Article :loading="loading">
    <section v-for="(author, i) in Object.entries(yuanqu)" :key="i">
      <h1>{{ author[0] }}</h1>
      <section v-for="(article, j) in author[1]" :key="j">
        <h2> {{ article.title }}</h2>
        <p v-for="(line, k) in article.paragraphs" :key="k">
          {{ line }}
        </p>
      </section>
    </section>
  </Article>
</template>