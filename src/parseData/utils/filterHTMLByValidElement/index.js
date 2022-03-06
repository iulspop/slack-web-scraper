const cheerio = require('cheerio')

function filterHTMLByValidElement(html) {
  const htmlLines = html.split('\n')

  const newHTMLLines = htmlLines.filter(
    html => isValidPost(html) || isValidThread(html) || isValidDateDividerLine(html)
  )

  /*
  ENABLE WHEN DEBUGGING
  const newHTMLLines = htmlLines.filter(html => {
    const isValid = isValidPost(html) || isValidThread(html) || isValidDateDividerLine(html)
    if (isValid) {
      return true
    } else {
      console.log('The following invalid HTML was filtered:', html)
      return false
    }
  })
  */

  return newHTMLLines.join('\n')
}

const isValidPost = html => {
  const $ = cheerio.load(html)
  const loadedCheerio = $('[aria-roledescription="message"]')
  return loadedCheerio.length === 1
}

const isValidThread = html => {
  const $ = cheerio.load(html)
  const loadedCheerio = $('[aria-label^="Thread"]')
  return loadedCheerio.length === 1
}

const isValidDateDividerLine = html => {
  const $ = cheerio.load(html)
  const loadedCheerio = $('.c-message_list__day_divider__label__pill')
  return loadedCheerio.length === 1
}

module.exports = { filterHTMLByValidElement, isValidPost, isValidThread, isValidDateDividerLine }
