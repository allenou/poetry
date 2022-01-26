 
<template>
  <div class="item">
    <div class="header">
      <span class="title">{{ source.title }}</span>
      <i class="iconfont">&#xe753;</i>
    </div>

    <!-- <ul>
      <li v-for="(i, t) in slotProps.item.content" :key="t">
        <span v-html="highlight(i, keyword)"></span>
        <i class="iconfont" v-if="speech" @click="read(i)">&#xe753;</i>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: "dynamic-size-item",
  props: {
    index: {
      type: Number,
    },
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>