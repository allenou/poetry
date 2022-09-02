import { defineStore } from 'pinia'

export const useArticleStore = defineStore('articles', () => {
  const articles = ref({
    shijing: {}
  })

  function setArticles(articles: any, type: any) {
    if (!articles.value[type]) articles.value[type] = articles
  }

  return { articles, setArticles }
})