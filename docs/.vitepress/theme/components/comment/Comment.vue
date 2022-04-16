<template>
  <ClientOnly>
    <Beaudar v-if="page.title" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import Beaudar from './Beaudar.vue'
import { useData } from 'vitepress'
const { page } = useData()

</script>

<style scoped>

</style>
