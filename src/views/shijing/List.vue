<template>
  <div id="list">
    <div class="content" v-for="(item, index) in list" :key="index">
      <ul>
        <li class="title" v-html="highlight(item.title, keyword)"></li>
        <template v-for="(i, t) in item.content">
          <li :key="t" v-html="highlight(i, keyword)"></li>
          <!-- <li v-html="pinyin(i)" :key="t"></li> -->
        </template>
      </ul>
      <!-- <VirtualList :list="list" v-slot:default="slotProps">
        <div class="header">
          <span class="title">{{ slotProps.item.title }}</span>
          <i
            class="iconfont"
            v-if="speech"
            @click="read(slotProps.item.content)"
            >&#xe753;</i
          >
        </div>

        <ul>
          <li v-for="(i, t) in slotProps.item.content" :key="t">
            <span v-html="highlight(i, keyword)"></span>
            <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
          </li>
        </ul>
      </VirtualList> -->
    </div>
  </div>
</template>
<script>
import articles from "chinese-poetry/chinese-poetry/shijing/shijing.json";
export default {
  data() {
    return {
      articles: [],
      list: articles,
    };
  },
  created() {
    this.articles = articles;
  },
  watch: {
    keyword() {
      this.list = this.articles.filter(
        (item) => this.matchTitle(item.title) || this.matchContent(item.content)
      );
    },
  },
};
</script>
