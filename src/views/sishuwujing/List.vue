<template>
  <div id="list">
    <div class="item" v-for="(item,index) in searchResults" :key="index">
      <template v-if="!item.length">
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
      </template>
      <template v-else>
        <div v-for="(i,t) in item" :key="t">
          <h2 class="title">
            {{i.chapter}}
            <i class="iconfont" v-if="speech" @click="read(i.paragraphs)">&#xe753;</i>
          </h2>
          <ul>
            <li v-for="(it,ix) in i.paragraphs" :key="ix">
              <span v-html="highlight(it,keyword)"></span>
              <i class="iconfont" v-if="speech" @click="read(it)">&#xe753;</i>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      searchResults: []
    };
  },
  computed: {
    ...mapGetters(["sishuwujing", "keyword"])
  },
  created() {
    this.$store.dispatch("fetchSishuwujing").then(list => {
      this.searchResults = list;
    });
  },
  watch: {
    "$store.state.keyword"(keyword) {
      if (!keyword) {
        return (this.searchResults = this.sishuwujing);
      }
      const searchResults = this.sishuwujing.filter(item => {
        if (item.chapter.includes(keyword)) {
          return item;
        }
      });
      this.searchResults = searchResults;
    }
  },
  methods: {}
};
</script>
