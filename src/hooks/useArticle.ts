import { PATHS } from "@/config"
import request from "@/utils/request"
import { flattenArticles, type FlattenedItem } from "@/utils/flattenArticles"

export type TRouteName = keyof typeof PATHS

export type ArticleType = 'lunyu' | 'shijing' | 'yuanqu' | 'caocao' | 'youmengying' | 'sishuwujing'

interface UseArticleOptions {
  flatten?: boolean
  articleType?: ArticleType
}

function useArticle<T>(defaultData?: T, options: UseArticleOptions = {}) {
  const route = useRoute()
  const loading = ref(false)
  const data = ref(defaultData)
  const flattenedData = ref<FlattenedItem[]>([])

  // 获取文章类型
  const getArticleType = (routeName: string): ArticleType => {
    const typeMap: Record<string, ArticleType> = {
      'lunyu': 'lunyu',
      'shijing': 'shijing',
      'yuanqu': 'yuanqu',
      'caocao': 'caocao',
      'youmengying': 'youmengying',
      'sishuwujing': 'sishuwujing'
    }
    return typeMap[routeName] || 'lunyu'
  }

  // 获取数据的函数
  const fetchData = async () => {
    loading.value = true

    const routeName = route.name as TRouteName
    const url = `${PATHS[routeName]}`
    const res = await request<T[]>(url)

    loading.value = false

    if (res) {
      data.value = res

      // 如果需要扁平化
      if (options.flatten) {
        const articleType = options.articleType || getArticleType(routeName as string)
        flattenedData.value = flattenArticles(res, articleType)
      }
    }
  }

  // 监听路由变化
  watch(() => route.name, (newName, oldName) => {
    if (newName !== oldName) {
      fetchData()
    }
  })

  onMounted(async () => {
    await fetchData()
  })

  return {
    loading,
    data,
    flattenedData
  }
}

export default useArticle