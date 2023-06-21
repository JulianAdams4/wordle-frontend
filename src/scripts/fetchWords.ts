const _fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const WORD_CHALLENGE_LENGTH = 5
const WORDS_URL = 'https://gitlab.com/d2945/words/-/raw/main/words.txt';

(async () => {
  const pathfile = path.resolve(__dirname, '..', 'constants', 'wordlist.json')

  try {
    const response = await _fetch(WORDS_URL)
    const text = await response.text()

    const words = text
      .split('\n')
      // @ts-ignore
      .filter((word) => Boolean(word) && word.length === WORD_CHALLENGE_LENGTH)
    const jsonWords = JSON.stringify(words, null, 2)

    fs.writeFileSync(pathfile, jsonWords)

    console.log('Updated words list')
  } catch (error) {
    console.error('Error al actualizar el listado de palabras:', error)
    fs.writeFileSync(pathfile, '[]')
  }
})()

export {}