export type TShiJing = {
  title: string
  chapter: string
  section: string
  content: string[]
}

export type TShiJingSection = {
  [key: string]: TShiJing[]
}

export type TShiJingChapter = {
  [key: string]: TShiJingSection
}


export type TYuanQu = {
  title: string
  author: string
  dynasty: string
  paragraphs: string[]
}

export type TAuthor = {
  [key: string]: TYuanQu[]
}

export type TLunYu = {
  chapter: string
  paragraphs: string[]
}

export type TSiShuWuJing = {
  chapter: string
  paragraphs: string[]
}

export type TMenZi = {
  chapter: string
  paragraphs: string[]
}

export type TYouMengYing = {
  content: string
  comment: string[]
}

export type TCaoCao = {
  title: string
  paragraphs: string[]
}
