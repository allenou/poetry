import { PATHS } from "@/config"
import request from "@/utils/request"
import { flattenArticles, type FlattenedItem } from "@/utils/flattenArticles"
import type { Ref } from "vue"
import type { TMenZi, TSiShuWuJing } from "@/typings"

export type ArticleType = 'lunyu' | 'shijing' | 'yuanqu' | 'caocao' | 'youmengying' | 'sishuwujing'

interface UseArticleOptions {
  flatten?: boolean
  articleType?: ArticleType | Ref<ArticleType>
}

type SiShuWuJingPayload = {
  daxue: TSiShuWuJing
  zhongyong: TSiShuWuJing
  mengzi: TMenZi[]
}

type CacheEntry = {
  raw: any
  flattened?: FlattenedItem[]
}

const articleCache = new Map<ArticleType, CacheEntry>()

const createEmptySiShuWuJing = (): SiShuWuJingPayload => ({
  daxue: { chapter: '', paragraphs: [] },
  zhongyong: { chapter: '', paragraphs: [] },
  mengzi: []
})

function useArticle<T>(defaultData?: T, options: UseArticleOptions = {}) {
  const route = useRoute()
  const loading = ref(false)
  const data = ref<any>(defaultData)
  const flattenedData = ref<FlattenedItem[]>([])

  const getArticleType = (routeName?: string): ArticleType => {
    const typeMap: Record<string, ArticleType> = {
      'lunyu': 'lunyu',
      'shijing': 'shijing',
      'yuanqu': 'yuanqu',
      'caocao': 'caocao',
      'youmengying': 'youmengying',
      'sishuwujing': 'sishuwujing'
    }
    return typeMap[routeName ?? ''] || 'lunyu'
  }

  const resolvedArticleType = computed<ArticleType>(() => {
    const provided = options.articleType ? unref(options.articleType) : undefined
    return provided || getArticleType(route.name as string | undefined)
  })

  const resolveUrlByArticleType = (articleType: ArticleType) => {
    if (articleType === 'sishuwujing') return null
    return PATHS[articleType as keyof typeof PATHS]
  }

  const fetchSiShuWuJing = async () => {
    const payload = createEmptySiShuWuJing()

    const [daxue, zhongyong, mengzi] = await Promise.all([
      request<TSiShuWuJing>(PATHS.daxue),
      request<TSiShuWuJing>(PATHS.zhongyong),
      request<TMenZi[]>(PATHS.mengzi)
    ])

    if (daxue) {
      payload.daxue = daxue
    }
    if (zhongyong) {
      payload.zhongyong = zhongyong
    }
    if (mengzi) {
      payload.mengzi = mengzi
    }

    const cacheEntry: CacheEntry = { raw: payload }
    if (options.flatten) {
      cacheEntry.flattened = flattenArticles(payload as any, 'sishuwujing')
      flattenedData.value = cacheEntry.flattened
    }

    data.value = payload as unknown as T
    articleCache.set('sishuwujing', cacheEntry)
    if (!options.flatten) {
      flattenedData.value = []
    }
  }

  const applyCacheEntry = (articleType: ArticleType, entry: CacheEntry) => {
    data.value = entry.raw as T

    if (options.flatten) {
      if (!entry.flattened) {
        entry.flattened = flattenArticles(entry.raw as any, articleType)
        articleCache.set(articleType, entry)
      }
      flattenedData.value = entry.flattened ?? []
    } else {
      flattenedData.value = []
    }

    loading.value = false
    return true
  }

  const fetchData = async () => {
    try {
      const articleType = resolvedArticleType.value

      const cached = articleCache.get(articleType)
      if (cached) {
        applyCacheEntry(articleType, cached)
        return
      }

      loading.value = true

      if (articleType === 'sishuwujing') {
        await fetchSiShuWuJing()
        return
      }

      const url = resolveUrlByArticleType(articleType) ?? PATHS[route.name as keyof typeof PATHS]

      if (!url) {
        console.warn(`[useArticle] 未找到 ${articleType} 对应的数据路径`)
        data.value = defaultData
        flattenedData.value = []
        return
      }

      const res = await request<T[]>(url)

      if (res) {
        const cacheEntry: CacheEntry = { raw: res }
        if (options.flatten) {
          cacheEntry.flattened = flattenArticles(res, articleType)
          flattenedData.value = cacheEntry.flattened ?? []
        } else if (flattenedData.value.length > 0) {
          flattenedData.value = []
        }

        data.value = res
        articleCache.set(articleType, cacheEntry)

      } else {
        data.value = defaultData
        if (options.flatten) {
          flattenedData.value = []
        }
      }
    } catch (error) {
      console.error('[useArticle] 获取数据失败:', error)
      data.value = defaultData
      if (options.flatten) {
        flattenedData.value = []
      }
    } finally {
      loading.value = false
    }
  }

  const fetchSignature = computed(() => `${route.fullPath ?? ''}|${resolvedArticleType.value}`)

  watch(
    fetchSignature,
    () => {
      fetchData()
    },
    { immediate: true }
  )

  return {
    loading,
    data,
    flattenedData
  }
}

export default useArticle
