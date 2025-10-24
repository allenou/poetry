<script setup lang="ts">
import request from "@/utils/request";
import { PATHS } from "@/config";
import type { TMenZi, TSiShuWuJing } from "@/typings";

let daxue = ref<TSiShuWuJing>({ chapter: '', paragraphs: [] });
let zhongyong = ref<TSiShuWuJing>({ chapter: '', paragraphs: [] });
let mengzi = ref<TMenZi[]>([]);

onMounted(async () => {
  daxue.value = await request<TSiShuWuJing>(PATHS.daxue) || { chapter: '', paragraphs: [] };
  console.log(daxue.value);

  zhongyong.value = await request<TSiShuWuJing>(PATHS.zhongyong) || { chapter: '', paragraphs: [] };
  mengzi.value = await request<TMenZi[]>(PATHS.mengzi) || [];
})
</script>
  
<template>
  <Article>
    <section>
      <div class="line">
        <h4>{{ daxue.chapter }}</h4>
      </div>
      <div class="line" v-for="(line, i) in daxue.paragraphs" :key="i">
        {{ line }}
      </div>
    </section>
    <section>
      <div class="line">
        <h4>{{ zhongyong.chapter }}</h4>
      </div>
      <div class="line" v-for="(line, i) in zhongyong.paragraphs" :key="i">
        {{ line }}
      </div>
    </section>
    <section>
      <div class="line">
        <h3>孟子</h3>
      </div>
      <div v-for="(article, i) in mengzi" :key="i">
        <div class="line">
          <h4> {{ article.chapter }}</h4>
        </div>
        <div class="line" v-for="(line, j) in article.paragraphs" :key="j">
          {{ line }}
        </div>
      </div>
    </section>
  </Article>
</template>