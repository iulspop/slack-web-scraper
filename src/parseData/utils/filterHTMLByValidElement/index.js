const cheerio = require('cheerio')

function filterHTMLByValidElement(html) {
  const htmlLines = html.split('\n')

  const newHTMLLines = htmlLines.filter(
    html => isValidPost(html) || isValidThread(html) || isValidDateDividerLine(html)
  )

  return newHTMLLines.join('\n')
}

const isValidPost = html => {
  const $ = cheerio.load(html)
  const loadedCheerio = $('[data-qa="message-text"]')
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
