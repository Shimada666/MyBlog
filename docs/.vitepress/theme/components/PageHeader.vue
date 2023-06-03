<script lang="ts" setup>
import { useData } from 'vitepress'
import { useCurrentPage } from '../../../page-util'
import dayjs from 'dayjs'

const { page, theme } = useData()
const { isPost } = useCurrentPage()
</script>

<template>
  <div v-if="isPost" class="page-header style-text">
    <div class="post-heading">
      <div class="tags">
        <a
          v-for="(tag, index) in page.frontmatter.tags"
          :key="index"
          class="tag"
          :title="tag">{{ tag }}</a>
      </div>
      <h1>{{ page.title }}</h1>
      <div class="subheading">{{ page.frontmatter.subTitle }}</div>
      <span class="meta">{{ theme.lastUpdatedText }} on {{ dayjs(page.lastUpdated || + new Date()).format('YYYY-MM-DD') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin sans-serif {
  /* Hux learn from
     *     TypeIsBeautiful,
     *     [This Post](http://zhuanlan.zhihu.com/ibuick/20186806) etc.
     */
  font-family: // System Font            // https://www.webkit.org/blog/3709/using-the-system-font-in-web-content/
    -apple-system, // OSX ^10.11 & iOS ^9  San Francisco & 苹方 for Safari
    BlinkMacSystemFont, // OSX ^10.11 & iOS ^9  San Francisco & 苹方 for Blink

      // English First
    "Helvetica Neue", // OSX
    "Arial", // Win "Helvetica"
      //" Segoe UI",            // Win ^8

      // Chinese Fallback
    "PingFang SC", // OSX ^10.11 & iOS ^9  苹方（华康信凭黑）
    "Hiragino Sans GB", // OSX ^10.6            冬青黑体
    "STHeiti", // OSX <10.6  & iOS <9  华文黑体
    "Microsoft YaHei", // Win                  微软雅黑
    "Microsoft JhengHei", // Win                  微软正黑
    "Source Han Sans SC", // SourceHan - begin    思源黑体
    "Noto Sans CJK SC",
    "Source Han Sans CN",
    "Noto Sans SC",
    "Source Han Sans TC",
    "Noto Sans CJK TC", // SourceHan - end
    "WenQuanYi Micro Hei", // Linux                文泉驿微米黑
    SimSun, // Win old              中易宋体
    sans-serif; // System Fallback

  line-height: 1.7;
}

@mixin serif {
  font-family: 'Lora', 'Times New Roman', serif;
}

.page-header {
  &.style-text {
    background: none;

    .site-heading,
    .post-heading,
    .page-heading {
      padding: 30px 0 20px;
      color: var(--gray-dark);

      @media only screen and (max-width: 768px) {
        padding: 30px 0 0 0;
      }

      .subheading {
        margin-bottom: 15px;
      }
    }

    .tags {
      a,
      .tag {
        border-color: var(--gray-dark);
        color: var(--gray-dark);

        &:hover,
        &:active {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  // NOTE: Background images are set within the HTML using inline CSS!
  margin-bottom: 0px; /* 0 on mobile, modify by Hux */
  @media only screen and (min-width: 768px) {
    margin-bottom: 20px; /* response on desktop */
  }

  .site-heading,
  .post-heading,
  .page-heading {
    padding: 85px 0 55px;
    color: white;
    @media only screen and (min-width: 768px) {
      padding: 150px 0;
    }
  }

  // masterialize
  .site-heading {
    padding: 95px 0 70px;
    @media only screen and (min-width: 768px) {
      padding: 150px 0;
    }
  }

  .site-heading,
  .page-heading {
    text-align: center;

    h1 {
      margin-top: 0;
      font-size: 50px;
    }

    .subheading {
      @include sans-serif;
      font-size: 18px;
      line-height: 1.1;
      display: block;
      font-weight: 300;
      margin: 10px 0 0;
    }

    @media only screen and (min-width: 768px) {
      h1 {
        font-size: 80px;
      }
    }
  }

  .post-heading {
    h1 {
      font-size: 30px;
      margin-bottom: 24px;
    }

    .subheading,
    .meta {
      line-height: 1.1;
      display: block;
    }

    .subheading {
      @include sans-serif;
      font-size: 17px;
      line-height: 1.4;
      font-weight: normal;
      margin: 10px 0 30px;
      margin-top: -5px;
    }

    .meta {
      @include serif;
      font-style: italic;
      font-weight: 300;
      font-size: 16px;

      a {
        color: white;
      }
    }

    @media only screen and (min-width: 768px) {
      h1 {
        font-size: 55px;
        margin: 24px 0;
        font-weight: 600;
        line-height: 1.25;
      }
      .subheading {
        font-size: 30px;
      }
      .meta {
        font-size: 20px;
      }
    }
  }

  .header-img-credit {
    position: absolute;
    bottom: 6px;
    right: 9px;
    color: white;
    opacity: 0.3;
    font-size: 10px;
    z-index: 1;

    a {
      color: white;
    }

    @media only screen and (min-width: 768px) {
      & {
        font-size: 12px;
        bottom: 10px;
        right: 15px;
      }
    }
  }
}
</style>
