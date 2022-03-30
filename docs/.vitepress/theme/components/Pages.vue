<script lang="ts" setup>
import { useData, withBase } from "vitepress";

const { theme } = useData();
const posts = theme.value.posts


</script>

<template>
  <div class="px-5 sm:px-7 md:px-10 max-w-5xl mx-auto">
    <div class="mt-12">
      <div class="post-preview" v-for="(post, index) in posts" :key="index">
        <div v-if="post.frontMatter.title">
          <a :href="withBase(post.regularPath)">
            <div class="post-title">
              {{ post.frontMatter.title }}
            </div>
            <h3 class="post-subtitle" v-if="post.frontMatter.subTitle">{{ post.frontMatter.subTitle }}</h3>
            <div class="post-content-preview">
              {{ post.frontMatter.description }}
            </div>
          </a>
          <p class="post-meta">
            Posted by Shimada666 on {{ post.frontMatter.dateString }}
          </p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-preview {
  a {
    color: var(--gray-dark);

    &:hover,
    &:focus {
      text-decoration: none;
      color: var(--brand-primary);
    }

    .post-title {
      font-size: 21px;
      line-height: 1.3;
      margin-top: 30px;
      margin-bottom: 8px;
    }

    .post-subtitle {
      font-size: 15px;
      line-height: 1.3;
      margin: 0;
      font-weight: 300;
      margin-bottom: 10px;
    }
  }

  .post-meta {
    font-family: 'Lora', 'Times New Roman', serif;
    color: var(--brand-gray);
    font-size: 16px;
    font-style: italic;
    margin-top: 0;

    a {
      text-decoration: none;
      color: var(--gray-dark);

      &:hover,
      &:focus {
        color: var(--brand-primary);
        text-decoration: underline;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    a {
      .post-title {
        font-size: 26px;
        line-height: 1.3;
        margin-bottom: 10px;
      }

      .post-subtitle {
        font-size: 16px;
      }
    }
    .post-meta {
      font-size: 18px;
    }
  }
}

.post-content-preview {
  line-height: 1.7;
  font-size: 13px;
  font-style: italic;
  color: var(--brand-gray);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  &:hover {
    color: var(--brand-primary);
  }

  @media only screen and (min-width: 768px) {
    font-size: 14px;
  }
}

</style>
