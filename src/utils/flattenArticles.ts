import type { 
  TLunYu, 
  TShiJing, 
  TYuanQu, 
  TCaoCao, 
  TYouMengYing,
  TSiShuWuJing,
  TMenZi,
  TShiJingChapter,
  TAuthor
} from '@/typings'

// 统一的扁平化项类型
export interface FlattenedItem {
  id: string
  type: 'chapter' | 'section' | 'article' | 'author' | 'content'
  level: number
  title: string
  content?: string[]
  data: any
  parentId?: string
}

// 论语扁平化
export function flattenLunYu(articles: TLunYu[]): FlattenedItem[] {
  const result: FlattenedItem[] = []
  
  articles.forEach((article, index) => {
    // 章节标题
    result.push({
      id: `lunyu-chapter-${index}`,
      type: 'chapter',
      level: 1,
      title: article.chapter,
      data: article,
    })
    
    // 段落内容
    result.push({
      id: `lunyu-content-${index}`,
      type: 'content',
      level: 2,
      title: '',
      content: article.paragraphs,
      data: article,
      parentId: `lunyu-chapter-${index}`
    })
  })
  
  return result
}

// 诗经扁平化
export function flattenShiJing(articles: TShiJing[]): FlattenedItem[] {
  const result: FlattenedItem[] = []
  
  // 先按章节分组
  const chapters: TShiJingChapter = {}
  articles.forEach(article => {
    if (!chapters[article.chapter]) {
      chapters[article.chapter] = {}
    }
    if (!chapters[article.chapter][article.section]) {
      chapters[article.chapter][article.section] = []
    }
    chapters[article.chapter][article.section].push(article)
  })
  
  // 扁平化处理
  Object.entries(chapters).forEach(([chapterName, sections], chapterIndex) => {
    // 章节标题
    result.push({
      id: `shijing-chapter-${chapterIndex}`,
      type: 'chapter',
      level: 1,
      title: chapterName,
      data: { chapter: chapterName }
    })
    
    Object.entries(sections).forEach(([sectionName, poems], sectionIndex) => {
      // 小节标题
      result.push({
        id: `shijing-section-${chapterIndex}-${sectionIndex}`,
        type: 'section',
        level: 2,
        title: sectionName,
        data: { chapter: chapterName, section: sectionName },
        parentId: `shijing-chapter-${chapterIndex}`
      })
      
      // 诗篇内容
      poems.forEach((poem, poemIndex) => {
        result.push({
          id: `shijing-poem-${chapterIndex}-${sectionIndex}-${poemIndex}`,
          type: 'article',
          level: 3,
          title: poem.title,
          content: poem.content,
          data: poem,
          parentId: `shijing-section-${chapterIndex}-${sectionIndex}`
        })
      })
    })
  })
  
  return result
}

// 元曲扁平化
export function flattenYuanQu(articles: TYuanQu[]): FlattenedItem[] {
  const result: FlattenedItem[] = []
  
  // 按作者分组
  const authors: TAuthor = {}
  articles.forEach(article => {
    if (!authors[article.author]) {
      authors[article.author] = []
    }
    authors[article.author].push(article)
  })
  
  // 扁平化处理
  Object.entries(authors).forEach(([authorName, authorPoems], authorIndex) => {
    // 作者标题
    result.push({
      id: `yuanqu-author-${authorIndex}`,
      type: 'author',
      level: 1,
      title: authorName,
      data: { author: authorName }
    })
    
    // 该作者的作品
    authorPoems.forEach((poem, poemIndex) => {
      result.push({
        id: `yuanqu-poem-${authorIndex}-${poemIndex}`,
        type: 'article',
        level: 2,
        title: poem.title,
        content: poem.paragraphs,
        data: poem,
        parentId: `yuanqu-author-${authorIndex}`
      })
    })
  })
  
  return result
}

// 曹操诗集扁平化
export function flattenCaoCao(articles: TCaoCao[]): FlattenedItem[] {
  const result: FlattenedItem[] = []
  
  articles.forEach((article, index) => {
    result.push({
      id: `caocao-poem-${index}`,
      type: 'article',
      level: 1,
      title: article.title,
      content: article.paragraphs,
      data: article
    })
  })
  
  return result
}

// 幽梦影扁平化
export function flattenYouMengYing(articles: TYouMengYing[]): FlattenedItem[] {
  const result: FlattenedItem[] = []
  
  articles.forEach((article, index) => {
    result.push({
      id: `youmengying-content-${index}`,
      type: 'content',
      level: 1,
      title: article.content,
      content: article.comment,
      data: article
    })
  })
  
  return result
}

// 四书五经扁平化
export function flattenSiShuWuJing(data: {
  daxue: TSiShuWuJing
  zhongyong: TSiShuWuJing
  mengzi: TMenZi[]
}): FlattenedItem[] {
  const result: FlattenedItem[] = []
  
  // 大学
  result.push({
    id: 'daxue-chapter',
    type: 'chapter',
    level: 1,
    title: data.daxue.chapter,
    data: data.daxue
  })
  
  result.push({
    id: 'daxue-content',
    type: 'content',
    level: 2,
    title: '',
    content: data.daxue.paragraphs,
    data: data.daxue,
    parentId: 'daxue-chapter'
  })
  
  // 中庸
  result.push({
    id: 'zhongyong-chapter',
    type: 'chapter',
    level: 1,
    title: data.zhongyong.chapter,
    data: data.zhongyong
  })
  
  result.push({
    id: 'zhongyong-content',
    type: 'content',
    level: 2,
    title: '',
    content: data.zhongyong.paragraphs,
    data: data.zhongyong,
    parentId: 'zhongyong-chapter'
  })
  
  // 孟子
  result.push({
    id: 'mengzi-section',
    type: 'section',
    level: 1,
    title: '孟子',
    data: { section: '孟子' }
  })
  
  data.mengzi.forEach((chapter, index) => {
    result.push({
      id: `mengzi-chapter-${index}`,
      type: 'chapter',
      level: 2,
      title: chapter.chapter,
      data: chapter,
      parentId: 'mengzi-section'
    })
    
    result.push({
      id: `mengzi-content-${index}`,
      type: 'content',
      level: 3,
      title: '',
      content: chapter.paragraphs,
      data: chapter,
      parentId: `mengzi-chapter-${index}`
    })
  })
  
  return result
}

// 通用扁平化函数
export function flattenArticles<T>(
  articles: T[], 
  articleType: 'lunyu' | 'shijing' | 'yuanqu' | 'caocao' | 'youmengying' | 'sishuwujing'
): FlattenedItem[] {
  switch (articleType) {
    case 'lunyu':
      return flattenLunYu(articles as TLunYu[])
    case 'shijing':
      return flattenShiJing(articles as TShiJing[])
    case 'yuanqu':
      return flattenYuanQu(articles as TYuanQu[])
    case 'caocao':
      return flattenCaoCao(articles as TCaoCao[])
    case 'youmengying':
      return flattenYouMengYing(articles as TYouMengYing[])
    case 'sishuwujing':
      return flattenSiShuWuJing(articles as any)
    default:
      return []
  }
}
