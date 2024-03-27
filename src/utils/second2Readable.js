/**
 * format seconds to pattern like (01:)30:55
 * @param {number} sec seconds
 * @returns {string} hms string
 */
function second2Readable (sec) {
  if (sec / 3600 >= 1) {
    return `${~~(sec / 3600)}:` + `${~~(sec % 3600 / 60)}:`.padStart(3, '0') + `${sec % 60}`.padStart(2, '0')
  } else {
    return `${~~(sec % 3600 / 60)}:` + `${sec % 60}`.padStart(2, '0')
  }
}

export {
  second2Readable
}
