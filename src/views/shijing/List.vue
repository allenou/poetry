<template>
  <div id="list">
      <VirtualList :list="list" v-slot:default="slotProps">
        <h2>
          {{slotProps.item.title}}
          <i
            class="iconfont"
            v-if="speech"
            @click="read(slotProps.item.content)"
          >&#xe753;</i>
        </h2>

        <ul>
          <li v-for="(i,t) in slotProps.item.content" :key="t">
            <span v-html="highlight(i,keyword)"></span>
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
      list: articles
    };
  },
  computed: {
    ...mapGetters(["keyword"])
  },
  created(){
  console.log(111)
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
#list {
  text-align: center;
}
</style>
