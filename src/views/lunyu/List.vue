<template>
  <div id="list">
    <VirtualList :list="list" v-slot:default="slotProps">
      <h2 class="title">
        {{slotProps.item.chapter}}
        <i
          class="iconfont"
          v-if="speech"
          @click="read(slotProps.item.paragraphs)"
        >&#xe753;</i>
      </h2>
      <ul>
        <li v-for="(i,t) in slotProps.item.paragraphs" :key="t">
          <span v-html="highlight(i,keyword)"></span>
          <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
        </li>
      </ul>
    </VirtualList>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import articles from "chinese-poetry/chinese-poetry/lunyu/lunyu.json";

export default {
  data() {
    return {
      articles,
      list: articles
    };
  },
  computed: {
    ...mapGetters(["keyword"])
  },

  watch: {
    keyword(text) {
      this.list = !text
        ? this.articles
        : this.articles.filter(
            item =>
              this.matchTitle(item.chapter) ||
              this.matchContent(item.paragraphs)
          );
    }
  }
};
</script>
<style scoped>
#list {
  text-align: left;
}
</style>
