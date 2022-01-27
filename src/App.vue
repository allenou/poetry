<template>
  <div id="app">
    <Aside></Aside>

    <div id="container">
      <main>
        <SearchBar></SearchBar>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from "./components/Aside";
import SearchBar from "./components/SearchBar";
export default {
  name: "app",
  components: {
    Aside,
    SearchBar,
  },
};
</script>

<style lang="postcss" >
html,
body {
  height: 100%;
  background-color: #ecf0f1;
  font-family: "宋体";
}
h2 {
  margin-bottom: 20px !important;
  font-size: 24px !important;
  font-weight: bold !important;
}
#app {
  position: relative;
  display: flex;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#container {
  position: relative;

  width: 100%;
  margin-left: 100px;
  padding-bottom: 88px;
}
main {
  width: 80%;
  margin: auto;
}
#list {
  margin-top: 128px;
  padding: 0 10%;
  text-align: center;
}
/* #list .item {
  margin-bottom: 66px;
} */
#list .header {
  margin-top: 66px;
  line-height: 50px;
}
#list .header .title {
  position: relative;
  font-size: 28px;
  font-weight: bold;
}
#list .header .keyword {
  font-size: 36px;
}
#list li {
  line-height: 30px;
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
  font-size: 20px;
}
</style>
