<template>
  <div id="app">
    <Aside></Aside>

    <div id="container">
      <main>
        <!-- <SearchBar></SearchBar> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from "./components/Aside";
// import SearchBar from "./components/SearchBar";
export default {
  name: "app",
  components: {
    Aside,
    // SearchBar,
  },
};
</script>

<style lang="postcss" >
html,
body {
  /* overflow-x: scroll;
  overflow-y: scroll; */

  /* font-family: "宋体"; */
  background-color: #ecf0f1;
}
h2 {
  margin-bottom: 20px !important;
  font-size: 24px !important;
  font-weight: bold !important;
}
#app {
  position: relative;
  display: flex;
  /* overflow: hidden; */
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
}
#container {
  position: relative;
  width: 100%;
  padding-top: 22px;
  /* margin-left: 100px; */
}
main {
  width: 80%;
  margin: auto;
}
#list {
  display: flex;
  /* padding: 0 10%; */
  /* text-align: center; */
}
/* #list .item {
  margin-bottom: 66px;
} */
#list .content {
  margin: 0 30px;
}
#list ul {
  /* overflow: scroll; */
  /* height: 600px; */
  display: flex;
}
#list .header {
  margin-top: 66px;
  line-height: 50px;
}
#list .title {
  position: relative;
  font-size: 28px;
  font-weight: bold;
  margin-right:  10px;
}
#list .header .keyword {
  font-size: 36px;
}
#list li {
  /* overflow: hidden; */
  display: flex;
  writing-mode: vertical-lr;
  padding: 0 10px;
  /* float: left; */
  /* word-wrap:break-word; */
  /* padding: 0 30px; */
}
#list .word {
  /* display: block; */
  /* writing-mode: vertical-lr; */
}

#list .iconfont {
  position: absolute;
  right: -9999px;
  cursor: pointer;
}

#list .header:hover .iconfont,
#list li:hover .iconfont {
  right: inherit;
  margin-left: 20px;
}
.keyword {
  /* font-size: 20px; */
}

ruby {
  float: left;
  display: flex;
  align-items: center;
  padding: 4px 0;
}
rt {
  line-height: 20px;
  writing-mode: horizontal-tb;
}
</style>
