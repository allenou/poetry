<template>
  <div id="list">
    <div class="item" v-for="(item,index) in searchResults" :key="index">
      <h2 class="title">
        {{item.chapter}}
        <i class="iconfont" v-if="speech" @click="read(item.paragraphs)">&#xe753;</i>
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
        if (
          this.matchTitle(item.chapter) ||
          this.matchContent(item.paragraphs)
        ) {
          return item;
        }
      });
      this.searchResults = searchResults;
    }
  },
  methods: {}
};
</script>
<style scoped>
 {
  text-align: left;
}
</style>
