<template>
  <nav>
    <ul>
      <li v-for="(item, index) in books" :key="index">
        <h1
          class="title"
          v-if="item.meta"
          :to="item.path"
          @click="handleClick(item, index)"
        >
          <span v-for="(itm, indx) in item.meta.title" :key="indx">
            {{ itm }}
          </span>
        </h1>
      </li>
    </ul>
  </nav>
</template>
<script>
import "animate.css";

import { routers } from "../config";

export default {
  data() {
    return {
      books: routers,
    };
  },
  methods: {
    handleClick(book, index) {
      if (book.meta.title !== this.books[0].meta.title) {
        this.books.splice(index, 1);
        this.books.unshift(book);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
nav {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100px;
  height: 100%;
  text-align: center;
  background-color: #3a4d83;
}
nav:hover {
  width: auto;
  width: 700px !important;
}
/* nav:hover .li {
  background-color: #fff;
} */
/* nav h2 {
  margin: 30px 0;
  cursor: pointer;
} */
ul {
  margin: 0;
  display: flex;
  height: 100vh;
  padding-left: 0;
  list-style: none;
}
ul li {
  width: 100px;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  color: #fff;
}
ul li:hover {
  color: #000;
  background-color: #bbb5ac;
}
ul .title {
  /* display: block; */
  /* writing-mode: vertical-lr; */

  width: 100px;

  /* padding: 10px 0; */
  cursor: pointer;
  font-size: 30px;
  text-align: center;
  text-decoration: none;
}
span {
  display: block;
}
/* ul a:hover {
  color: #232323;
  background-color: #fff;
} */
nav .badge {
  /* position: absolute !important;
  bottom: 1rem;
  right: unset !important;
  top: unset !important; */
  /* left: 1rem; */
}
.router-link-active {
  color: #232323;
  background-color: #fff;
}
</style>
