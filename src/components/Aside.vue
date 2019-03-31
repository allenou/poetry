<template>
  <nav>
    <h2>中国诗词</h2>
    <ul @click="nav($event)">
      <li data-nav="shijing">
        <router-link to="/shijing" exact-active-class="active">《诗经》</router-link>
      </li>
      <li data-nav="lunyu">
        <router-link to="/lunyu" exact-active-class="active">《论语》</router-link>
      </li>

      <li data-nav="sishuwujing">
        <router-link to="/sishuwujing" exact-active-class="active">《四书五经》</router-link>
      </li>
    </ul>
    <GitHubBadge slug="allenou/poerty" fill="#fff" class="badge"></GitHubBadge>
  </nav>
</template>
<script>
import GitHubBadge from "vue-github-badge";
export default {
  components: {
    GitHubBadge
  },
  methods: {
    nav(e) {
      if (e.target.tagName === "LI") {
        this.$emit("nav", e.target.dataset.nav);
      }
    }
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
  background-color: #232323;
}
nav h2 {
  margin: 30px 0;
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
