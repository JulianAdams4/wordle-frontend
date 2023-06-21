import { addDays, differenceInDays, startOfDay } from 'date-fns'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import queryString from 'query-string'

import wordlist from '../constants/wordlist.json'
import { getToday } from './dateutils'

const WORDS = wordlist as string[]

export const firstGameDate = new Date(2022, 0)

export const periodInDays = 1

export const isWordInWordList = (word: string) => {
  return WORDS.includes(word.toLowerCase())
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const getLastGameDate = (today: Date) => {
  const t = startOfDay(today)
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays
  return addDays(t, -daysSinceLastGame)
}

export const getNextGameDate = (today: Date) => {
  return addDays(getLastGameDate(today), periodInDays)
}

export const isValidGameDate = (date: Date) => {
  if (date < firstGameDate || date > getToday()) {
    return false
  }

  return differenceInDays(firstGameDate, date) % periodInDays === 0
}

export const getIndex = (gameDate: Date) => {
  let start = firstGameDate
  let index = -1
  do {
    index++
    start = addDays(start, periodInDays)
  } while (start <= gameDate)

  return index
}

export const getWordOfDay = (index: number) => {
  if (index < 0) throw new Error('Invalid index')
  return WORDS[index % WORDS.length].toUpperCase()
}

export const getSolution = (gameDate: Date) => {
  const nextGameDate = getNextGameDate(gameDate)
  const index = getIndex(gameDate)
  const wordOfTheDay = getWordOfDay(index)
  return {
    solution: wordOfTheDay,
    tomorrow: nextGameDate.valueOf(),
  }
}

export const getIsLatestGame = () => {
  const parsed = queryString.parse(window.location.search)
  return parsed === null || !('d' in parsed)
}

export const { solution, tomorrow } = getSolution(new Date())
