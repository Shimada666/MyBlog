<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import Beaudar from './components/Beaudar.vue'

const { Layout } = DefaultTheme

</script>

<template>
  <Layout>
    <template #page-bottom-ads>
      <Beaudar></Beaudar>
    </template>
  </Layout>
</template>
