import { PATHS } from "@/config"
import request from "@/utils/request"

export type TRouteName = keyof typeof PATHS

function useArticle<T>(defaultData?: T) {
  const route = useRoute()
  const loading = ref(false)
  const data = ref(defaultData)

  onMounted(async () => {
    loading.value = true

    const routeName = route.name as TRouteName
    const url = `${PATHS[routeName]}`
    const res = await request<T>(url)

    loading.value = false

    if (res) data.value = res
  })

  return {
    loading,
    data
  }
}

export default useArticle 