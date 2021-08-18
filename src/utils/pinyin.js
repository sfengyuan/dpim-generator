const VOWELS = 'aoeiuüv'
export const splitPinyin = (word) => {
  let i = 0
  const end = word.length
  while (i < end) {
    if (VOWELS.includes(word[i])) {
      break
    }
    i++
  }
  let consonant = word.substring(0, i)
  consonant = !consonant ? '_o' : consonant

  return [consonant, word.substring(i)]
}
