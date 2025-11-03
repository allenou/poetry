import { pinyin, polyphonic } from 'pinyin-pro'

const CHINESE_CHAR_PATTERN = /[\u3400-\u9fff]/

export type PinyinSegment =
  | { type: 'ruby'; char: string; pinyin: string; isPolyphonic?: boolean; allPinyins?: string[] }
  | { type: 'text'; text: string }

/**
 * 检查一个汉字是否为多音字
 */
const isPolyphonicChar = (char: string): { isPolyphonic: boolean; allPinyins: string[] } => {
  try {
    const allPinyins = polyphonic(char, { type: 'array' })[0] || []
    // 过滤掉空字符串和与原字符相同的项
    const validPinyins = allPinyins.filter(p => p && p !== char)
    return {
      isPolyphonic: validPinyins.length > 1,
      allPinyins: validPinyins
    }
  } catch (error) {
    console.warn(`Failed to check polyphonic for char: ${char}`, error)
    return { isPolyphonic: false, allPinyins: [] }
  }
}

/**
 * 将文本转换为可用于拼音注释的片段
 */
export const buildPinyinSegments = (text: string): PinyinSegment[] => {
  if (!text) return []

  const characters = Array.from(text)
  const pinyinList = pinyin(text, { type: 'array' })
  const segments: PinyinSegment[] = []
  let buffer = ''

  for (let i = 0; i < characters.length; i += 1) {
    const char = characters[i]
    const currentPinyin = pinyinList[i] ?? ''
    const isChinese = CHINESE_CHAR_PATTERN.test(char)
    const shouldAnnotate = isChinese && currentPinyin && currentPinyin !== char

    if (shouldAnnotate) {
      if (buffer) {
        segments.push({ type: 'text', text: buffer })
        buffer = ''
      }

      // 检查是否为多音字
      const { isPolyphonic, allPinyins } = isPolyphonicChar(char)

      segments.push({
        type: 'ruby',
        char,
        pinyin: currentPinyin,
        isPolyphonic: isPolyphonic,
        allPinyins: isPolyphonic ? allPinyins : undefined
      })
    } else {
      buffer += char
    }
  }

  if (buffer) {
    segments.push({ type: 'text', text: buffer })
  }

  return segments
}