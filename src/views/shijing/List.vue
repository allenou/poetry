<template>
  <div id="list">
    <section>
      <div class="item" v-for="(item,index) in searchResults" :key="index">
        <h2>
          {{item.title}}
          <i class="iconfont" v-if="speech" @click="read(item.content)">&#xe753;</i>
        </h2>

        <ul>
          <li v-for="(i,t) in item.content" :key="t">
            <span v-html="highlight(i,keyword)"></span>
            <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
          </li>
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
        if (this.matchTitle(item.title) || this.matchContent(item.content)) {
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


#list {
  text-align: center;
}


</style>
