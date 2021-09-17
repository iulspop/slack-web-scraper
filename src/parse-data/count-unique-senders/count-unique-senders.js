const cheerio = require('cheerio')

module.exports = countUniqueSenders

function countUniqueSenders(posts) {
  const senders = []

  posts.forEach(post => {
    const $ = cheerio.load(post)
    const senderNodes = $('.c-message__sender_link')
    for (let i = 0; i < senderNodes.length; i++) {
      const senderName = $.text([senderNodes[i]])
      if (!senders.includes(senderName)) { senders.push(senderName) }
    }
  })

  return senders.length
}
