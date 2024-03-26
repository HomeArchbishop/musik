/**
 * format seconds to pattern like (01:)30:55
 * @param {number} sec seconds
 * @returns {string} hms string
 */
function second2Readable (sec) {
  let str = sec / 3600 >= 1 ? `${sec / 3600}:` : ''
  str += `${sec % 3600 / 60}:` + `${sec % 60}`.padStart(2, '0')
  return str
}

export {
  second2Readable
}
