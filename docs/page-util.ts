import { useData } from 'vitepress'

export function useCurrentPage () {
  const { page } = useData()
  return {
    isPost: !!page.value.title
  }
}
