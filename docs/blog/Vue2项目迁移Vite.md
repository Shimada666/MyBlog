---
title: Vue2项目迁移Vite
tags: 
  - 前端
  - vue
---

众所周知，大多数的 vue2 项目都是用 vue-cli 创建的，但是众所周知 vue-cli 创建的项目，vue-cli 是基于 webpack 的，冷启动以及热重载速度均远不及 vite。  
那么，这样的项目，在迁移 vite 中，会遇到什么问题？  
本博客将记录 vue2 + ts 的项目迁移至 vue 的一些经验，希望对大家有所帮助。

## 为什么使用 Vite 开发？
vite 是新一代的前端开发与构建工具，区别于 webpack, 它的开发服务器基于 es modules 机制，提供给用户快到惊人的热更新功能。  
举个例子，一个使用 vue2 的 vue-cli 项目可能需要启动 30-60 秒，但如果迁移到 vite，那么启动甚至可至 1 秒内，这就是 vite 的优势了。

## 迁移前的项目介绍
这个项目是 2020 年开始开发的。项目使用 vue-cli4 创建，使用 vue2 + ts 为主要技术栈，前中期大量使用 `vue-class-component` 的方式的类组件来进行开发。
在 vue3 出现后，引入了 `@vue/composition-api` 与 `unplugin-vue2-script-setup` 进行开发。编写代码体验已经和写 vue3 很相似了，但是开发时的启动速度仍然是一大痛点。

## 如何迁移？
要知道如何迁移，就必须调研 vite 与 vue-cli 使用上有哪些区别。总结下来，主要有这几点  
1. `public.html` 位置的不同，vue-cli 中是 `public/index.html`，而 vite 中直接是根目录下的 `index.html`。
2. 配置文件的不同。vue-cli 使用的 `vue.config.js` 文件, vite 中使用的是 `vite.config.js`。且配置也有一定差异。比如全局 css 文件的引入方式。vue-cli 使用的是
```javascript
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style/share.scss";'
      }
    }
  }
}
```
而 vite 中使用的是
```typescript
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source, fp) {
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
3. 使用 vite 必须库原生支持 esm 的模式。通常可以通过升级库解决。 
4. 环境变量使用方式的不同。vue-cli 中是通过 `process.env.xxxx` 来使用环境变量，而 vite 中是通过 `import.meta.env.xxxx` 来使用。这一点可用 `vite-plugin-env-compatible` 抹平差距。

了解了以上四点。就可以开始迁移了。
## 迁移实操
在生产项目迁移时，我们通常都希望能在使用上新功能的同时，也保留旧功能，如果发生故障可以随时切换旧功能完成修复。
因此，在引入 vite 的同时保留 vue-cli 的方式就是我们迁移的重点。生产环境，安全第一。
同时，引入 vite 并不意味着我们要使用 vite 的打包功能，我们仍然可以使用 vue-cli 的打包功能，保证生产环境的稳定与兼容性。

### 无痛迁移
首先要介绍一款插件。[vue-cli-plugin-vite](https://github.com/IndexXuan/vue-cli-plugin-vite) 这个插件可以方便我们无痛迁移 vue-cli 至 vite 并保留 vue-cli 的能力。
此插件复用了 vue.config.js，大部分配置都不需要修改。基本上可以做到开箱即用，无痛体验 vite 的启动速度。

### 手工迁移
这也是我使用的迁移方式。因为我觉得复用原有代码的方式太过丑陋，同时迁移所需的配置项也没那么多。因此我们对于上文提到的 1-4 点说一下我们是怎么做的。
1. index.html 的迁移非常简单，创建一份 `index.html` 到根目录即可
2. 配置文件也好解决，创建一个 `vite.config.ts` 即可
3. 库必须是 esm 这一点，我遇到了使用的 vue-echarts 不兼容的问题。查看 github，发现把版本升级到 >6.0.0 即可解决。于是按照文档升级版本后迁移至 v6 版本解决。
4. 环境变量的问题，我直接使用了 `vite-plugin-env-compatible` 库帮助我导入所有环境变量。作为插件配置在 `vite.config.ts` 即可。

## 迁移结果
迁移后，项目启动时间从 30-60 秒降至 1 秒，同时保留了原有的开发、打包方式，把风险降到了最低。至此，本文结束。