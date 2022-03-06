const { isValidPost, isValidThread } = require('../filterHTMLByValidElement')
const cheerio = require('cheerio')

function parsePostsToJson(dateGroupsJSON) {
  const dateGroups = JSON.parse(dateGroupsJSON)

  const dateGroupsWithParsedPosts = dateGroups.map(dateGroup => {
    const parsedPosts = dateGroup.posts.map(post => {
      if (isValidPost(post)) return parsePost(post)
      if (isValidThread(post)) return parseThread(post)
    })
    return { ...dateGroup, posts: parsedPosts }
  })

  return JSON.stringify(dateGroupsWithParsedPosts)
}

function parsePost(post) {
  const $ = cheerio.load(post)
  const time = $('.c-timestamp')
    .attr('data-stringify-text')
    .replace(/[\[\]]/g, '')
  const sender = $('.c-message__sender_link').text()
  const text = $('.p-rich_text_section').html().trim()

  return Post(time, sender, text)
}

function parseThread(thread) {
  const $ = cheerio.load(thread)

  let firstPost
  $('[aria-label^="Thread"]')
    .children()
    .has('[aria-roledescription="message"]')
    .each((_, post) => {
      if (!firstPost) {
        firstPost = parsePost(post)
      } else {
        firstPost.replies.push(parsePost(post))
      }
    })

  return firstPost
}

function Post(time, sender, text, replies = []) {
  return {
    time,
    sender,
    text,
    replies,
  }
}

module.exports = { parsePostsToJson, parsePost, parseThread }
