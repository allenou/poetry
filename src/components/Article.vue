<script setup lang="ts">
defineProps({
  loading: Boolean
})
</script>
<template>
  <div v-if="loading" text="center">加载中...</div>
  <div v-else px-4 py-4>
    <div class="wrap">
      <article>
        <slot></slot>
      </article>
    </div>
  </div>
</template>

<style  lang="scss">
.wrap {
  overflow: scroll;
  max-width: 89vw;
  max-height: 95vh;
  @apply border-2 border-red-500;
}

article {
  letter-spacing: 20px;
  writing-mode: vertical-lr;
}

h2 {
  @apply text-5xl;
  font-weight: 800;
}

h3 {
  @apply text-4xl;
  font-weight: 700;
}

h4 {
  @apply text-3xl;
  font-weight: 600;
}

.line {
  @apply border-r-1 border-red-500 px-4 py-6 whitespace-nowrap text-xl;
}
</style>