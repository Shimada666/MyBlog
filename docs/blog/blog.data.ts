import fs from 'fs'
import globby from 'globby'
import matter from 'gray-matter'
import { sync } from 'cross-spawn'
import path from 'path'

export interface Post {
  frontmatter: {
    lastUpdated: number
    title: string;
    subTitle?: string;
    tags?: string[];
    description?: string;
  }
  regularPath: string
}

export interface BlogData {
  tags: string[]
  posts: Post[]
}

function getGitLastUpdatedTimeStamp (filePath): number {
  let lastUpdated = 0
  try {
    lastUpdated = parseInt(sync(
      'git',
      ['log', '-1', '--format=%at', path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    ).stdout.toString('utf-8')) * 1000 || +new Date()
  } catch (e) { /* do not handle for now */ }
  return lastUpdated
}

export function getTagsAndPosts (): BlogData {
  const tags: Set<string> = new Set()
  const posts = globby.sync(['**.md'], { ignore: ['node_modules', 'README.md'] })
    .filter((item) => item.includes('blog/'))
    .map((item) => {
      // const lastUpdated = Math.round(fs.statSync(item).mtimeMs)
      const lastUpdated = getGitLastUpdatedTimeStamp(item)
      const file = fs.readFileSync(item, 'utf-8')
      const { data, content } = matter(file)
      if (data.tags) {
        for (const tag of data.tags) {
          tags.add(tag)
        }
      }
      return {
        frontmatter: {
          lastUpdated,
          title: data.title || '',
          tags: data.tags || [],
          description: data.description || content.slice(0, 300),
          ...data
        },
        regularPath: `/${item.replace('docs/', '').replace('.md', '.html')}`
      }
    })
    // @ts-ignore
    .sort((p1, p2) => p2.frontmatter.lastUpdated - p1.frontmatter.lastUpdated)
  return {
    tags: [...tags],
    posts
  }
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
