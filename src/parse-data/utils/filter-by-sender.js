const cheerio = require('cheerio')

function filterBySender(senderRegex, posts) {
  const filteredPosts = []

  posts.forEach(post => {
    const $ = cheerio.load(post)
    const firstSender = $.text([$('.c-message__sender_link')[0]])
    if (senderRegex.test(firstSender)) { filteredPosts.push(post) }
  })

  return filteredPosts
}

module.exports = filterBySender
