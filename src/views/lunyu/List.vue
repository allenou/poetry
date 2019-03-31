<template>
  <div id="list">
    <div class="item" v-for="(item,index) in searchResults" :key="index">
      <h2 class="title">
        {{item.chapter}}
        <i class="iconfont" v-if="speech" @click="speak(item.paragraphs)">&#xe753;</i>
      </h2>
      <ul>
        <li v-for="(i,t) in item.paragraphs" :key="t" v-html="highlight(i,keyword)"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchResults: []
    };
  },
  computed: {
    ...mapGetters(["lunyu", "keyword"])
  },
  created() {
    this.$store.dispatch("fetchLunyu").then(list => {
      this.searchResults = list;
    });
  },
  watch: {
    "$store.state.keyword"(keyword) {
      if (!keyword) {
        return (this.searchResults = this.lunyu);
      }
      const searchResults = this.lunyu.filter(item => {
        if (item.chapter.includes(keyword)) {
          return item;
        }
      });
      this.searchResults = searchResults;
    }
  },
  methods: {
    checkContent(content) {
      let result = false;
      const keyword = this.keyword;
      for (let i = 0; i < content.length; i++) {
        if (content[i].includes(keyword)) {
          result = true;
          break;
        }
      }
      return result;
    }
  }
};
</script>
<style scoped>
#list {
  text-align: left;
}
</style>
