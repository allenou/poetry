<template>
  <div id="list">
    <div class="content" v-for="(item, index) in list" :key="index">
      <ul>
        <li class="title" v-html="highlight(item.rhythmic, keyword)"></li>
        <template v-for="(i, t) in item.paragraphs">
          <li :key="t" v-html="highlight(i, keyword)"></li>
          <!-- <li v-html="pinyin(i)" :key="t"></li> -->
        </template>
      </ul>
    </div>
  </div>
  <!-- <div id="list">
      <VirtualList :list="list" v-slot:default="slotProps">
        <h2>
          {{slotProps.item.rhythmic}}
          <i
            class="iconfont"
            v-if="speech"
            @click="read(slotProps.item.content)"
          >&#xe753;</i>
        </h2>
         <p>@{{slotProps.item.author}}</p>
        <ul>
          <li v-for="(i,t) in slotProps.item.paragraphs" :key="t">
            <span v-html="highlight(i,keyword)"></span>
            <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
          </li>
        </ul>
      </VirtualList>
  </div> -->
</template>
<script>
import { mapGetters } from "vuex";
import ci0 from "chinese-poetry/chinese-poetry/ci/ci.song.0.json";
import ci1 from "chinese-poetry/chinese-poetry/ci/ci.song.1000.json";
import ci2 from "chinese-poetry/chinese-poetry/ci/ci.song.2000.json";
import ci3 from "chinese-poetry/chinese-poetry/ci/ci.song.3000.json";

const articles = [...ci0, ...ci1, ...ci2, ...ci3];
console.log(articles);
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
<style scoped>
#list {
  text-align: center;
}
</style>
