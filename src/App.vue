<template>
  <div id="app">
    <Aside></Aside>
    <main>
      <SearchBar></SearchBar>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script>
import Aside from "./components/Aside";
import SearchBar from "./components/SearchBar";
export default {
  name: "app",
  components: {
    Aside,
    SearchBar
  }
};
</script>

<style>
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  background-color: #ecf0f1;
  font-family: cursive;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}
#app {
  display: flex;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: #efefef; */
}
main {
  width: 80%;
  /* margin-top: 10%; */
  /* background-color: #fff; */
  margin-left: 20%;
}
#list {
  margin-top: 88px;
  padding: 0 10%;
}
#list .item {
  margin-bottom: 66px;
}
#list .item li {
  position: relative;

  line-height: 30px;
}
#list h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
#list h2 .iconfont {
  margin-left: 60px;
}
/* .title {
  text-align: center;
} */
#list .iconfont {
  position: absolute;

  right: -9999px;
  /* margin-left: 50px; */
  cursor: pointer;
}

#list h2:hover .iconfont,
#list li:hover .iconfont {
  right: inherit;
}
</style>
