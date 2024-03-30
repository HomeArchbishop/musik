/**
 * parse lyrics
 * @param {string} str lyrics string
 * @returns {Array} parsed lyrics
 */
function parseLyrics (origin, pronunciation, translation) {
  const originArr = origin.split('\n').filter(line => /^\[\d+:\d+\.\d+\].*?$/.test(line))
  const pronunciationArr = pronunciation.split('\n').filter(line => /^\[\d+:\d+\.\d+\].*?$/.test(line))
  const translationArr = translation.split('\n').filter(line => /^\[\d+:\d+\.\d+\].*?$/.test(line))
  const parsedLyrics = []
  originArr.forEach((_, i) => {
    const originLine = originArr[i]
    const pronunciationLine = pronunciationArr[i] ?? ''
    const translationLine = translationArr[i] ?? ''
    const fromStr = [...originLine.matchAll(/(?<=\[)\d+:\d+\.\d+(?=\])/g)][0]?.[0]
    const from = Number(fromStr.match(/^\d+/g)[0]) * 60 + Number(Number(fromStr.match(/(?<=:)\d+\.\d+/g)[0]).toFixed(2))
    const lyricPiece = {
      from,
      origin: [...originLine.matchAll(/(?<=\[\d+:\d+\.\d+\]\s*)[^\s].*/g)][0]?.[0] ?? '',
      pronunciation: [...pronunciationLine.matchAll(/(?<=\[\d+:\d+\.\d+\]\s*)[^\s].*/g)][0]?.[0] ?? '',
      translation: [...translationLine.matchAll(/(?<=\[\d+:\d+\.\d+\]\s*)[^\s].*/g)][0]?.[0] ?? ''
    }
    parsedLyrics.push(lyricPiece)
  })
  return parsedLyrics
}

export {
  parseLyrics
}
