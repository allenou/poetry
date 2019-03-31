<template>
  <header>
    <input type="text" placeholder="输入关键字进行搜索" v-model="keyword">
  </header>
</template>
<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  watch: {
    keyword(keyword) {
      this.$store.commit("setKeyword", keyword);
    }
  }
};
</script>

<style scoped>
header {
  /* position: fixed;
  top: 0; */
  /* width: 80%; */
  padding: 30px;
  /* margin: auto; */
  text-align: center;
  /* background-color: #232323; */
  background-color: #efefef;
}
header input {
  height: 36px;

  width: 80%;
  /* margin: auto; */
  border: none;
  outline: none;
  text-indent: 14px;
}
</style>
