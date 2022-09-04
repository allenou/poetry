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
      <div class="line">
        <h3>{{ author[0] }}</h3>
      </div>
      <section v-for="(article, j) in author[1]" :key="j">
        <div class="line">
          <h4> {{ article.title }}</h4>
        </div>

        <div class="line" v-for="(line, k) in article.paragraphs" :key="k">
          {{ line }}
        </div>
      </section>
    </section>
  </Article>
</template>