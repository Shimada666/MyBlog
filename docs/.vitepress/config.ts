import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '鼠鼠屋 🐭',
  description: '一些简单的东西',
  base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
  lang: 'zh-CN', // 语言
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'// 图片放在public文件夹下
      }
    ]
  ],
  // 主题配置
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: '主页', link: '/' },
      { text: '分类', link: '/tags' },
      { text: 'Github', link: 'https://github.com/Shimada666' }
    ],
    sidebar: false,
    // sidebar: {
    //   '/blog/': getBlogSidebar(),
    // },
    // algolia: {
    //     appKey: '',
    //     indexName: '',
    //     searchParameters: {
    //         faeFilters: ['tags:guide,api']
    //     }
    // },
    nextLinks: true,
    prevLinks: true
  }
})
