import { pinyin } from 'pinyin-pro'

const CHINESE_CHAR_PATTERN = /[\u3400-\u9fff]/

export type PinyinSegment =
  | { type: 'ruby'; char: string; pinyin: string }
  | { type: 'text'; text: string }

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

      segments.push({
        type: 'ruby',
        char,
        pinyin: currentPinyin
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
