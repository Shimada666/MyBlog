<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

</script>

<template>
  <Layout>
    <template #page-bottom-ads>
      <div style="margin-top: 16px;">
        <component
          is="script"
          src="https://beaudar.lipk.org/client.js"
          repo="Shimada666/MyBlog"
          label="Comment"
          issue-term="url"
          theme="github-light"
          crossorigin="anonymous"
          async></component>
      </div>
    </template>
  </Layout>
</template>
