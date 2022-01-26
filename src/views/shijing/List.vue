<template>
  <div>
    <VirtualList :list="list" v-slot:default="slotProps">
      <div class="header">
        <span class="title">{{ slotProps.item.title }}</span>
        <i class="iconfont" v-if="speech" @click="read(slotProps.item.content)"
          >&#xe753;</i
        >
      </div>

      <ul>
        <li v-for="(i, t) in slotProps.item.content" :key="t">
          <span v-html="highlight(i, keyword)"></span>
          <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
        </li>
      </ul>
    </VirtualList>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import articles from "chinese-poetry/chinese-poetry/shijing/shijing.json";
export default {
  data() {
    return {
      articles,
      list: articles,
    };
  },
  computed: {
    ...mapGetters(["keyword"]),
  },
  created() {
  },
  watch: {
    keyword(text) {
      this.list = !text
        ? this.articles
        : this.articles.filter(
            (item) =>
              this.matchTitle(item.title) || this.matchContent(item.content)
          );
    },
  },
};
</script>
