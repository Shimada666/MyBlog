<script lang="ts" setup>
import { useData } from "vitepress";

const { page } = useData();

</script>

<template>
  <div class="mt-12">
    <h1>{{ page.title }}</h1>
  </div>
</template>

<style lang="scss" scoped>

</style>
