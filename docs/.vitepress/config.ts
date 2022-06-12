import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '鼠鼠屋 🐭',
  description: '一些简单的东西',
  base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
  lang: 'zh-CN', // 语言
  head: [],
  lastUpdated: true,
  // 主题配置
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: '主页', link: '/' },
      { text: '分类', link: '/tags' },
      { text: 'Github', link: 'https://github.com/Shimada666' }
    ],
    nextLinks: true,
    prevLinks: true
  },
  markdown: {
    config: (md) => {
      md.use(require('markdown-it-plantuml'))
    }
  }
})
