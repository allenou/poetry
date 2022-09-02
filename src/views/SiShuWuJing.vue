<script setup lang="ts">
import request from "@/utils/request";
import { PATHS } from "@/config";
import type { TMenZi, TSiShuWuJing } from "@/typings";

let daxue = ref<TSiShuWuJing>({});
let zhongyong = ref<TSiShuWuJing>({});
let mengzi = ref<TMenZi[]>([]);

onMounted(async () => {
  daxue.value = await request(PATHS.daxue);
  zhongyong.value = await request(PATHS.zhongyong);
  mengzi.value = await request(PATHS.mengzi)
})
</script>

<template>
  <article>
    <section>
      <h1>{{ daxue.chapter }}</h1>
      <p v-for="(line, i) in daxue.paragraphs" :key="i">
        {{ line }}
      </p>
    </section>
    <section>
      <h1>{{ zhongyong.chapter }}</h1>
      <p v-for="(line, i) in zhongyong.paragraphs" :key="i">
        {{ line }}
      </p>
    </section>
    <section>
      <h1>孟子</h1>
      <div v-for="(article, i) in mengzi" :key="i">
        <h2> {{ article.chapter }}</h2>
        <p v-for="(line, j) in article.paragraphs" :key="j">
          {{ line }}
        </p>
      </div>

    </section>
  </article>
</template>