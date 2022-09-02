<script setup lang="ts">
import { routes } from '@/router';

</script>

<template>
  <header>
    <h1>中文古诗词</h1>
    <nav>
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path">{{ route.meta?.title }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>