import fs from 'fs'
import globby from 'globby'
import matter from 'gray-matter'

export interface Post {
  frontmatter: {
    title: string;
    subTitle?: string;
    tags?: string[];
    description?: string;
    dateString?: string;
  }
  regularPath: string
}

export interface BlogData {
  tags: string[]
  posts: Post[]
}

export function getTagsAndPosts (): BlogData {
  const tags: string[] = []
  const posts = globby.sync(['**.md'], { ignore: ['node_modules', 'README.md'] })
    .filter((item) => item.includes('blog/'))
    .map((item) => {
      const file = fs.readFileSync(item, 'utf-8')
      const { data, content } = matter(file)
      if (data.tags) {
        tags.push(...data.tags)
      }
      return {
        frontmatter: {
          title: data.title || '',
          tags: data.tags || [],
          description: data.description || content.slice(0, 300),
          dateString: data.date ? data.date.toDateString() : '',
          ...data
        },
        regularPath: `/${item.replace('docs/', '').replace('.md', '.html')}`
      }
    })
    // @ts-ignore
    .sort((p1, p2) => p1.frontmatter.date < p2.frontmatter.date ? 1 : -1)
  return { tags, posts }
}

export declare const data: BlogData

export default {
  // declare files that should trigger HMR
  watch: './*.md',
  // read from fs and generate the data
  load (): BlogData {
    return getTagsAndPosts()
  }
}
