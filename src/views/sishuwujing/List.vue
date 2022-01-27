<template>
  <div id="list">
    <div class="content" v-for="(item, index) in list" :key="index">
      <ul>
        <li class="title" v-html="highlight(item.chapter, keyword)"></li>
        <template v-for="(i, t) in item.paragraphs">
          <li :key="t" v-html="highlight(i, keyword)"></li>
          <!-- <li v-html="pinyin(i)" :key="t"></li> -->
        </template>
      </ul>
    </div>
  </div>
  <!-- <div id="list">
    
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
    </VirtualList> -->
  <!-- </div> -->
</template>
<script>
import { mapGetters } from "vuex";
import daxue from "chinese-poetry/chinese-poetry/sishuwujing/daxue.json";
import zhongyong from "chinese-poetry/chinese-poetry/sishuwujing/zhongyong.json";
import mengzi from "chinese-poetry/chinese-poetry/sishuwujing/mengzi.json";

export default {
  data() {
    return {
      articles: [daxue, zhongyong, ...mengzi],
      list: [],
    };
  },
  computed: {
    ...mapGetters(["keyword"]),
  },
  created() {
    this.list = this.articles;
  },
  watch: {
    keyword(text) {
      this.list = !text
        ? this.articles
        : this.articles.filter(
            (item) =>
              this.matchTitle(item.chapter) ||
              this.matchContent(item.paragraphs)
          );
    },
  },
};
</script>
