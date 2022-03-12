<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme

</script>

<template>
  <Layout>
    <template #page-bottom-ads>
      <component
          is="script"
          src="https://beaudar.lipk.org/client.js"
          repo="Shimada666/MyBlog"
          label="Comment"
          issue-term="pathname"
          theme="github-light"
          crossorigin="anonymous"
          async></component>
    </template>
  </Layout>
</template>
