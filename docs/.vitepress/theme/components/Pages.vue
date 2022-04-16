<script lang="ts" setup>
import { withBase } from 'vitepress'
import { data as blogData } from '../../../blog/blog.data'
import { computed, ref } from 'vue'

const filterTag = ref('Show All')
const { posts, tags } = blogData

const filterPosts = computed(() => {
  if (filterTag.value === 'Show All') {
    return posts
  }
  return posts.filter(post => post.frontmatter.tags.find(tag => tag === filterTag.value))
})

</script>

<template>
  <div class="px-5 sm:px-7 md:px-10 grid md:grid-cols-12 md:gap-6 md:grid-rows-1 md:mt-8 max-w-6xl mx-auto">
    <div class="md:col-span-8">
      <div
        v-for="(post, index) in filterPosts"
        :key="index"
        class="post-preview">
        <div v-if="post.frontmatter.title">
          <a :href="withBase(post.regularPath)">
            <div class="post-title">
              {{ post.frontmatter.title }}
            </div>
            <h3 v-if="post.frontmatter.subTitle" class="post-subtitle">{{ post.frontmatter.subTitle }}</h3>
            <div class="post-content-preview">
              {{ post.frontmatter.description }}
            </div>
          </a>
          <p class="post-meta">
            Posted by Shimada666 on {{ post.frontmatter.dateString }}
          </p>
          <hr>
        </div>
      </div>
    </div>
    <div class="md:col-span-4 sidebar-container">
      <h5><a>FEATURED TAGS</a></h5>
      <div class="tags">
        <a
          v-for="tag in ['Show All', ...tags]"
          :key="tag"
          :class="{ 'tag-active': tag === filterTag }"
          @click="filterTag = tag">
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../public/variables.scss";

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
  // 多行截断
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

// Container of Sidebar, also Friends
.sidebar-container {
  color: $gray-light;
  font-size: 14px;
  h5 {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 700;
    color: $brand-gray;
    padding-bottom: 1em;
    a {
      color: $brand-gray !important;
      text-decoration: none;
    }
  }
  .tag-active{
    border-color: $brand-primary !important;
    color: $brand-primary !important;
  }
  a {
    color: $gray-light !important;
    &:hover,
    &:active {
      color: $brand-primary !important;
    }
  }
  .tags {
    a {
      border-color: $gray-light;
      &:hover,
      &:active {
        border-color: $brand-primary !important;
      }
    }
  }
  .short-about {
    img {
      width: 80%;
      display: block;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    p {
      margin-top: 0px;
      margin-bottom: 20px;
    }
    .list-inline > li {
      padding-left: 0px;
    }
  }
}
</style>
