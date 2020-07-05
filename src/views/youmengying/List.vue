<template>
  <div id="list">
    <VirtualList :list="list" v-slot:default="slotProps">
      <p style="position:relative">
        <b style="display:inline-block;">{{slotProps.item.content}}</b>
        <i class="iconfont" v-if="speech" @click="read(slotProps.item.content)">&#xe753;</i>
      </p>
      <ul>
        <li v-for="(i,t) in slotProps.item.comment" :key="t">
          <span v-html="highlight(i,keyword)"></span>
          <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
        </li>
      </ul>
    </VirtualList>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import articles from "chinese-poetry/chinese-poetry/youmengying/youmengying.json";

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
              this.matchTitle(item.title) || this.matchContent(item.content)
          );
    }
  }
};
</script>
<style scoped>
#list p:hover .iconfont {
  right: inherit;
}
</style>
