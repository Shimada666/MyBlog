<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import Pages from './components/Pages.vue'
import Intro from './components/home/Intro.vue'
import Comment from './components/comment/Comment.vue'
import PageHeader from './components/PageHeader.vue'
const { Layout } = DefaultTheme

</script>

<template>
  <div>
    <Layout>
      <template #doc-after>
        <ClientOnly>
          <Comment />
        </ClientOnly>
      </template>
      <template #doc-before>
        <PageHeader />
      </template>
      <!-- Home slot-->
      <template #home-features-before>
        <Intro />
      </template>
      <template #home-features-after>
        <Pages />
      </template>
    </Layout>
  </div>
</template>

<style lang="scss">
</style>
