<template>
  <nav>
    <h2 @click="()=>$router.push('/')">中文诗词</h2>
    <ul>
      <li v-for="(item,index) in routers" :key="index">
        <router-link
          v-if="item.meta"
          :to="item.path"
          exact-active-class="active"
        >《{{item.meta.title}}》</router-link>
      </li>
    </ul>
    <GitHubBadge slug="allenou/poerty" fill="#fff" class="badge"></GitHubBadge>
  </nav>
</template>
<script>
import GitHubBadge from "vue-github-badge";
import { routers } from "../config";

export default {
  components: {
    GitHubBadge
  },
  data() {
    return {
      routers: routers
    };
  }
};
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 20%;
  text-align: center;
  color: #fff;
  background-color: #2c3e50;
}
nav h2 {
  margin: 30px 0;
  cursor: pointer;
}
ul {
  padding-left: 0;
  list-style: none;
}
ul a {
  display: block;
  color: #fff;
  padding: 10px 0;
  cursor: pointer;
  text-decoration: none;
}
/* ul a:hover {
  color: #232323;
  background-color: #fff;
} */
nav .badge {
  position: absolute !important;
  bottom: 1rem;
  top: unset !important;
  left: 1rem;
}
.router-link-active {
  color: #232323;
  background-color: #fff;
}
</style>
