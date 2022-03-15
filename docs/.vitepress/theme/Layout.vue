<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import { useData } from "vitepress"

const { Layout } = DefaultTheme

function refreshBeaudar() {
  const beaudar = document.getElementById('beaudar');
  if (!beaudar) {
    return
  }
  beaudar.innerHTML = ''
  var script = document.createElement('script');
  script.src = 'https://beaudar.lipk.org/client.js';
  script.setAttribute('repo', 'Shimada666/MyBlog');
  script.setAttribute('issue-term', 'pathname');
  script.setAttribute('crossorigin', 'anonymous');
  script.setAttribute('label', 'Comment')
  script.setAttribute('theme', 'github-light');
  script.async = true;
  beaudar.appendChild(script);
}

const { title } = useData()

watch(title, () => refreshBeaudar())

</script>

<template>
  <Layout>
    <template #page-bottom-ads>
      <div style="margin-top: 16px;" id="beaudar">
        <component
          is="script"
          src="https://beaudar.lipk.org/client.js"
          repo="Shimada666/MyBlog"
          label="Comment"
          issue-term="pathname"
          theme="github-light"
          crossorigin="anonymous"
          async></component>
      </div>
    </template>
  </Layout>
</template>
