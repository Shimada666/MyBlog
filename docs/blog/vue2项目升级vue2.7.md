---
title: Vue2项目升级Vue2.7
tags: 
  - 前端
  - vue
---

就在七月初，vue 发布了 vue2.7 版本。这个版本带来了 vue3 的 composition-api 与 script setup 等特性，
让无法迁移 vue3 的 vue2 用户也可以用上新特性，使开发更便捷。

当然，vue2.7 升级也是有一些成本的，如某些插件需要更新版本、如果原先使用了 @vue/composition-api, unplugin-vue2-script-setup 等插件，
还需要对代码做相应的改造，接下来介绍一下我们该如何改造。
## 项目简介
我的项目是一个 2020 年 4 月创建的一个项目，不算新但也不算老，使用 vue + ts 开发。在后续经历过几次升级，
如引入 composition-api、unplugin-vue2-script-setup、vite 等插件，使用 vue3 的方式来开发项目。但是使用起来不知道是不是姿势问题，
还是有一些 bug, 因此这次打算升级到原生就支持这些的 vue2.7 版本，来彻底解决这些问题。

## 踩坑
### 基础依赖替换
第一步，当然是上网查找资料查看前人总结的升级攻略。不过 vue2.7 刚出来，写指南的人也并不多，那我们就根据官网的指示，
把依赖替换。
由于我们的项目引入了 composition-api 等插件，所以我们先做基础替换

* `vue` -> 2.7.5 升级最新版本
* `unplugin-vue2-script-setup` -> 删除（vue2.7提供了 script setup 功能）
* `vite-plugin-vue2` -> 替换为官方提供的 `@vitejs/plugin-vue2` 
* `vue-template-compiler` -> 根据官方手册，删除
* `@vue/composition-api` -> 删除

做完之后，删除 lock 文件与 node_modules，重新安装依赖。

### 替换 composition-api 相关代码

第二步，我们删除代码中引用 `@vue/composition-api` 的部分，并且把 `@vue/composition-api` 全局替换为 `vue`，因为这些内容 vue2.7 中有。

### 更新 vite.config.ts
第三步，我们需要更新 `vite.config.ts` 的配置。更新很简单。原先使用了 `vite-plugin-vue2`、
`unplugin-vue2-script-setup/vite` 这两个依赖，我们把相关代码都删除，
然后引入 `@vitejs/plugin-vue2`。最终代码像这样。
```typescript
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'path'
import env from 'vite-plugin-env-compatible'


export default defineConfig({
  plugins: [
    vue(),
    WindiCSS({
      preflight: false
    }),
    env()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData (source, fp) {
          // All scss files ending with imports.scss
          // will not re-import additionalData
          if (fp.endsWith('.scss')) return source
          // Use additionalData from legacy nuxt scss options
          return `@import "@/assets/style/share.scss"; ${source}`
        }
      }
    }
  }
})
```

### 升级 vue-echarts
做完这些，我们发现项目使用到了新语法的页面会渲染两次。经过排查，发现是引入的 `vue-echarts(v6.0.2)` 插件有问题。

既然发现插件有问题，那么第四步，就是修复问题。我们到 vue-echarts 的 github 页面查看，发现已经有人提出了 issue，且作者给出了解决办法：
升级到 v6.2.0 版本。我们尝试升级之后，发现问题解决。查看原因是因为旧版本 vue-echarts 的依赖 vue-demi 指定了 ^0.12.x 的版本，
而 vue-demi 需要 0.13.x 才开始支持。

### 升级 vueuse
做完这些之后，项目能跑起来了，但是测试发现还是有些问题。排查到是使用了 `vueuse` 的 `useVModel` 报错了。那么第五步，上github
查找 issue，发现已经有人提过且 pr 了。艾特了作者请求合并 pr，作者很快合并且 release 了新版本 v8.9.3，升级版本后成功解决问题

## 总结
至此，我们的项目就成功跑起来了。总的升级时间零零散散花了两天，主要还是排查问题上多耗费了些时间。但对于升级后的开发效率，这些都是值得的，
vue2.7 + vite 的开发方式能极大提升开发效率与体验，让开发不再痛苦，对于有时间的朋友，非常推荐将项目升级到 vue2.7 来。