<template>
  <header>
    <input type="search" :placeholder="placeholder" v-model="keyword" />
  </header>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      placeholder: "输入关键字进行搜索"
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
  display: flex;
  align-items: center;
  /* position: fixed;
  top: 0; */
  width: 80%;
  margin: 30px auto;
  padding-right: 10px;
  /* margin: 30px; */
  /* margin: auto; */
  text-align: center;
  /* background-color: #232323; */
  background-color: #fff;
}
header input {
  flex: 1;
  height: 36px;

  /* margin: auto; */
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
</style>
