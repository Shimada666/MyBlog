module.exports = {
    title: 'Simple Blog',
    description: '一些简单的东西',
    base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
    // lang: 'en-US', //语言
    repo: 'vuejs/vitepress',
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
    dest: './dist',
    // 主题配置
    themeConfig: {
        lastUpdated: 'Last Updated',
        collapsable: true,
        nav: [
            { text: '主页', link: '/' },
            { text: '博客', link: '/blog/' },
            { text: 'Github', link: 'https://github.com/Shimada666' }
        ],
        sidebar: {
            '/blog/': [
                {text: '痛苦日记', link: '/blog/pain-diary'},
            ]
        },
        // algolia: {
        //     appKey: '',
        //     indexName: '',
        //     searchParameters: {
        //         faeFilters: ['tags:guide,api']
        //     }
        // },
        editLink: true,
        nextLinks: true,
        prevLinks: true,
        sidebarDepth: 3
    }
}
