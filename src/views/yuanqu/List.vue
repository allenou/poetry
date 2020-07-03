<template>
  <div id="list">
    <div class="item" v-for="(item,index) in list" :key="index">
      <h2 class="title">
        {{item.title}}
        <i class="iconfont" v-if="speech" @click="read(item.title)">&#xe753;</i>
      </h2>
      <ul>
        <li v-for="(i,t) in item.paragraphs" :key="t">
          <span v-html="highlight(i,keyword)"></span>
          <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import articles from "chinese-poetry/chinese-poetry/yuanqu/yuanqu.json";

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
  text-align: center;
}
</style>
