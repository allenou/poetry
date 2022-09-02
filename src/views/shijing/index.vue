<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TShiJing, TShiJingChapter } from "@/typings";

const { data, loading } = useArticle<TShiJing[]>([])


const shijing = computed(() => {
  let chapter: TShiJingChapter = {};

  for (let article of data.value) {
    if (!chapter[article.chapter]) {
      chapter[article.chapter] = { [article.section]: [article] }
      continue
    }

    if (!chapter[article.chapter][article.section]) {
      chapter[article.chapter][article.section] = [article]
    } else {
      chapter[article.chapter][article.section].push(article)
    }
  }
  return chapter
})



</script>

<template>
  <Article :loading="loading">
    <section v-for="(chapter, i) in Object.entries(shijing)" :key="i">
      <h1> {{ chapter[0] }}</h1>
      <section v-for="(section, j) in Object.entries(chapter[1])" :key="j">
        <h2> {{ section[0] }}</h2>
        <section v-for="(article, k) in section[1]" :key="k">
          <h3>{{ article.title }}</h3>
          <p v-for="(line, l) in article.content" :key="l">{{ line }}</p>
        </section>
      </section>
    </section>
  </Article>
</template>