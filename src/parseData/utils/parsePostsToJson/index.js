const { isValidPost, isValidThread } = require('../filterHTMLByValidElement')
const cheerio = require('cheerio')

function parsePostsToJson(dateGroups) {
  const dateGroupsWithParsedPosts = dateGroups.map(dateGroup => {
    const parsedPosts = dateGroup.posts.map(html => {
      if (isValidPost(html)) return parsePost(html)
      if (isValidThread(html)) return parseThread(html)
    })
    return { ...dateGroup, posts: parsedPosts }
  })

  return dateGroupsWithParsedPosts
}

function parsePost(html) {
  const $ = cheerio.load(html)
  try {
    const time = $('.c-timestamp')
      .attr('data-stringify-text')
      .replace(/[\[\]]/g, '')
    const sender = $('.c-message__sender_link').text()
    const text = $('.p-rich_text_section').html().trim()
    return Post(time, sender, text)
  } catch (error) {
    console.log('\nParsing a post failed. Replacing post with placeholder.')
    console.log('Please create an issue at this URL: https://github.com/iulspop/slack-web-scraper/issues/new')
    console.log(
      'Title the issue "Parsing Error" and add the following HTML & error message to help us improve parsing:'
    )
    console.log($.html())
    console.error(error)
    console.log('\nParsing a post failed, so replaced it with placeholder instead. See message above.')
    return Post()
  }
}

function parseThread(thread) {
  const $ = cheerio.load(thread)

  let firstPost
  $('[aria-label^="Thread"]')
    .children()
    .has('[aria-roledescription="message"]')
    .each((_, postCheerioElement) => {
      if (!firstPost) {
        firstPost = parsePost($(postCheerioElement).html())
      } else {
        firstPost.replies.push(parsePost($(postCheerioElement).html()))
      }
    })

  return firstPost
}

function Post(time = '', sender = '', text = 'Placeholder Post', replies = []) {
  return {
    time,
    sender,
    text,
    replies,
  }
}

module.exports = { parsePostsToJson, parsePost, parseThread }
