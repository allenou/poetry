<script setup lang="ts">
import useArticle from "@/hooks/useArticle";
import type { TShiJing, TShiJingChapter } from "@/typings";

const { data, loading } = useArticle<TShiJing[]>([])

const chapters = ref<TShiJingChapter>({})
watch(() => data.value, () => {
  if (!data.value) return
  let obj: TShiJingChapter = {};

  for (let article of data.value) {
    if (!obj[article.chapter]) {
      obj[article.chapter] = { [article.section]: [article] }
      continue
    }

    if (!obj[article.chapter][article.section]) {
      obj[article.chapter][article.section] = [article]
    } else {
      obj[article.chapter][article.section].push(article)
    }
  }

  chapters.value = obj
})


</script>
  
<template>
  <Article :loading="loading">
    <section v-for="(chapter, i) in Object.entries(chapters)" :key="i">
      <div class="line">
        <h2> {{ chapter[0] }}</h2>
      </div>
      <section v-for="(section, j) in Object.entries(chapter[1])" :key="j">
        <div class="line">
          <h3> {{ section[0] }}</h3>
        </div>
        <section v-for="(article, k) in section[1]" :key="k">
          <div class="line">
            <h4>{{ article.title }}</h4>
          </div>
         <div class="line" v-for="(line, l) in article.content" :key="l">{{ line }}</div>
        </section>
      </section>
    </section>
  </Article>
</template>