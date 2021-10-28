module.exports = {
    title: 'Simple Blog',
    description: '一些简单的东西',
    // base: '/vuepress/',
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@alias': './assets/'
    //         }
    //     }
    // },
    dest: './dist',
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
                '',
                '痛苦日记'
            ]
        },
        sidebarDepth: 3
    }
};
