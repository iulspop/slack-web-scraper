const cheerio = require('cheerio')

function encodeNewlinePreElements(html) {
  const $ = cheerio.load(html)

  const preElementHandles = $('pre')
  preElementHandles.each((_, element) => {
    const newLineEncodedPreText = $(element).text().split('\n').join('\\n')
    $(element).text(newLineEncodedPreText)
  })

  return $.html()
}
exports.encodeNewlinePreElements = encodeNewlinePreElements
