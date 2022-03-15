import { defineConfig } from 'vitepress'

function getBlogSidebar() {
  return [
    { text: '痛苦日记', link: '/blog/PainDiary' },
    { text: '构建博客', link: '/blog/BuildBlog' }
  ]
}

export default defineConfig({
  title: 'Simple Blog',
  description: '一些简单的东西',
  base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
  lang: 'zh-CN', //语言
  head: [
    // 改变title的图标
    [
      'link',
      {
        rel: 'icon',
        href: 'http://cdn.corgi.plus/uPic/diana.jpg',//图片放在public文件夹下
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: '主页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: 'Github', link: 'https://github.com/Shimada666' }
    ],
    sidebar: {
      '/blog/': getBlogSidebar(),
    },
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
