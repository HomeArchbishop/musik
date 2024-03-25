/**
 * get theme color of an image
 * @param {string} img
 */
async function getThemeColor (img) {
  const image = new Image()
  const flag = new Promise((resolve) => { image.onload = resolve })
  image.src = img
  await flag
  const width = image.width
  const height = image.height
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, width, height)
  const originalPiexls = ctx.getImageData(0, 0, width, height)
  const colorCnt = {}
  for (let i = 0; i < originalPiexls.data.length; i += 4) {
    const r = originalPiexls.data[i]
    const g = originalPiexls.data[i + 1]
    const b = originalPiexls.data[i + 2]
    const a = originalPiexls.data[i + 3]
    if (a > 0 && (r < 200 && g < 200 && b < 200) && (r > 50 && g > 50 && b > 50)) {
      const key = `${r},${g},${b},${a}`
      if (!colorCnt[key]) {
        colorCnt[key] = 0
      }
      colorCnt[key]++
    }
  }
  let maxCount = 0
  let themeKey = 0
  for (const key in colorCnt) {
    if (maxCount <= colorCnt[key]) {
      maxCount = colorCnt
      themeKey = key
    }
  }
  const [r, g, b, a] = themeKey.split(',').map(s => +s)
  const $ = x => x.toString(16).padStart(2, '0')
  return `#${$(r)}${$(g)}${$(b)}${$(a)}`
}

export { getThemeColor }
