<template>
  <div id="list">
    <section>
      <div class="item" v-for="(item,index) in searchResults" :key="index">
        <h2>
          {{item.title}}
          <i class="iconfont" v-if="speech" @click="speak(item.content)">&#xe753;</i>
        </h2>
        <ul>
          <li v-for="(i,t) in item.content" :key="t" v-html="highlight(i,keyword)"></li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import pinyin from "pinyin";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchResults: []
    };
  },
  computed: {
    ...mapGetters(["shijing", "keyword"])
  },

  created() {
    this.$store.dispatch("fetchShijing").then(list => {
      this.searchResults = list;
    });
  },
  watch: {
    "$store.state.keyword"(keyword) {
      if (!keyword) {
        return (this.searchResults = this.shijing);
      }
      const searchResults = this.shijing.filter(item => {
        if (item.title.includes(keyword)) {
          return item;
        }
      });
      this.searchResults = searchResults;
    }
  },
  methods: {
    // checkContent(content) {
    //   let result = false;
    //   const keyword = this.keyword;
    //   for (let i = 0; i < content.length; i++) {
    //     if (content[i].includes(keyword)) {
    //       result = true;
    //       break;
    //     }
    //   }
    //   return result;
    // },
  }
};
</script>
<style scoped>
section {
  margin-top: 30px;
}

#list {
  text-align: center;
}
/* .item:hover .iconfont {
  display: block;
} */
</style>
