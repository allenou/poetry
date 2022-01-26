<template>
  <header>
    <div class="content">
      <input :placeholder="placeholder" v-model="keyword" />
    </div>
    <GitHubBadge slug="allenou/poerty" fill="#333" class="badge"></GitHubBadge>
  </header>
</template>
<script>
import GitHubBadge from "vue-github-badge";
export default {
  components: {
    GitHubBadge,
  },
  data() {
    return {
      keyword: "",
      placeholder: "输入关键字进行搜索",
    };
  },
  watch: {
    keyword(keyword) {
      this.$store.commit("setKeyword", keyword);
    },
  },
};
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: fixed; */
  top: 0;
  width: 100%;
  /* margin-left: 100px; */
  padding: 30px 0;
}
.content {
  width: 66%;
  /* margin: 30px auto; */
  padding: 6px;

  background-color: #fff;
}
input {
  width: 100%;
  height: 36px;

  border: none;
  outline: none;
  text-indent: 14px;
}
.iconfont {
  cursor: pointer;
}
.speaking {
  color: #e74c3c;
}
.badge {
  position: absolute !important;
  /* bottom: 1rem; */
  /* right: unset !important; */
  top: unset !important;
}
</style>
