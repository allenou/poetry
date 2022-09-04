<script setup lang="ts">
import { routes } from '@/router';
</script>

<template>
  <header class="items-center justify-between" p="x-8 y-2" flex="~" border="b gray-100">
    <h1 text="2xl">中文古诗词</h1>
    <ul>
      <li display="inline" p="x-4" v-for="route in routes">
        <router-link :to="route.path" :active-class="'text-blue'">{{ route.meta?.title }}</router-link>
      </li>
    </ul>
  </header>
</template>