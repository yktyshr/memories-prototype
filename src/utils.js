// @flow

const isWordBreak = (word: string): boolean => Boolean(word) && word.match(/[ \n　,/]/) !== null

const getWordStart = (text: string, index: number): number => {
  if (index === 0) {
    return 0
  }
  if (isWordBreak(text[index])) {
    return index
  }
  return getWordStart(text, index - 1)
}

const getWordEnd = (text: string, index: number): number => {
  if (! text[index]) {
    return text.length
  }
  if (isWordBreak(text[index])) {
    return index
  }
  return getWordEnd(text, index + 1)
}

export const getCurrentWord = (text: string, index: number): string => {
  const start = getWordStart(text, index)
  const end = getWordEnd(text, index)

  return text.slice(start, end + 1)
}
