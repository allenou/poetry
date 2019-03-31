<template>
  <div id="app">
    <Aside @nav="fetchPoertys($event)"></Aside>
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
  },
  data() {
    return {
      currentNav: "",
      placeholder: ""
    };
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
  background-color: #efefef;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}
#app {
  display: flex;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  padding: 0 10%;
}
#list .item {
  margin-bottom: 30px;
}
#list .item li {
  line-height: 30px;
}
.title {
  text-align: center;
}
</style>
