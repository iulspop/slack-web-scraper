const cheerio = require('cheerio')

module.exports = filterBySender

function filterBySender(senderRegex, posts) {
  const filteredPosts = []

  posts.forEach(post => {
    const $ = cheerio.load(post)
    let firstSender

    try {
      firstSender = $.text([$('.c-message__sender_link')[0]])
    } catch (err) {
      firstSender = ''
    } finally {
      if (senderRegex.test(firstSender)) filteredPosts.push(post)
    }
  })

  return filteredPosts
}
