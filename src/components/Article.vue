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
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  max-height: 95vh;
  @apply border-2 border-red-500;
}

article {
  letter-spacing: 2px;
  line-height: 1.8;
}

h2 {
  @apply text-4xl;
  font-weight: 800;
  margin-bottom: 1rem;
}

h3 {
  @apply text-3xl;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

h4 {
  @apply text-2xl;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.line {
  @apply border-b-1 border-red-500 px-4 py-3 text-lg;
  margin-bottom: 0.5rem;
}
</style>