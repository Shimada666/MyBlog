<template>
  <div style="margin-top: 16px;" id="beaudar">
    <component
      is="script"
      :src="SCRIPT_SRC"
      :repo="REPO_URL"
      :label="LABEL"
      :issue-term="ISSUE_TERM"
      :theme="THEME"
      :crossorigin="CROSS_ORIGIN"
      async></component>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useData } from "vitepress"


const SCRIPT_SRC = 'https://beaudar.lipk.org/client.js'
const REPO_URL = 'Shimada666/MyBlog'
const ISSUE_TERM = 'pathname'
const CROSS_ORIGIN = 'anonymous'
const LABEL = '💬 评论'
const THEME = 'github-light'

function refreshBeaudar() {
  const beaudar = document.getElementById('beaudar');
  if (!beaudar) {
    return
  }
  beaudar.innerHTML = ''
  var script = document.createElement('script');
  script.src = SCRIPT_SRC;
  script.setAttribute('repo', REPO_URL);
  script.setAttribute('issue-term', ISSUE_TERM);
  script.setAttribute('crossorigin', CROSS_ORIGIN);
  script.setAttribute('label', LABEL)
  script.setAttribute('theme', THEME)
  script.async = true;
  beaudar.appendChild(script);
}

const { title } = useData()

watch(title, () => refreshBeaudar(), {immediate: true})

</script>

<style scoped>

</style>
