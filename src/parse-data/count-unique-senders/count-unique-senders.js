const cheerio = require('cheerio')

module.exports = countUniqueSenders

function countUniqueSenders(posts) {
  const senders = []

  posts.forEach(post => {
    const $ = cheerio.load(post)
    const senderNodes = $('.c-message__sender_link')
    for (let i = 0; i < senderNodes.length; i++) {
      const senderName = $.text([senderNodes[i]])
      if (senderName === 'Slackbot') { continue }
      if (!senders.includes(senderName)) {
        // console.log(senderName) // it seems duplicates are added for some reason and tests don't catch it
        senders.push(senderName)
      }
    }
  })

  return senders.length
}
