<script setup lang="ts">
defineProps({
  loading: Boolean
})
</script>
<template>
  <p v-if="loading">加载中...</p>
  <article v-else>
    <slot></slot>
  </article>
</template>