<template>
  <div id="list">
    <section>
      <div class="item" v-for="(item,index) in list" :key="index">
        <p style="position:relative">
          <b style="display:inline-block;">{{item.content}}</b>
          <i class="iconfont" v-if="speech" @click="read(item.content)">&#xe753;</i>
        </p>
        <ul>
          <li v-for="(i,t) in item.comment" :key="t">
            <span v-html="highlight(i,keyword)"></span>
            <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
          </li>
        </ul>
      </div>
    </section>
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
