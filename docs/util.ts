import fs from 'fs-extra'
import globby from 'globby'
import matter from 'gray-matter'

export function getPosts () {
  const posts = globby.sync(['**.md'], { ignore: ['node_modules', 'README.md'] })
    .filter((item) => item.includes('blog/'))
    .map((item) => {
      const file = fs.readFileSync(item, 'utf-8')
      const { data, content } = matter(file)
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
  return posts
}
