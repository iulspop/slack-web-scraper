const { isDebugMode } = require('../isDebugMode')
const { isValidPost, isValidThread } = require('../filterHTMLByValidElement')
const cheerio = require('cheerio')

const DEBUG_MODE = isDebugMode()

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
    if (DEBUG_MODE) {
      console.log('\n###### Error ######\n')
      console.error(error)
      console.log('\n###### HTML Element ######\n')
      console.log($.html())
      console.log('\nParsing post failed. Replacing post with placeholder.')
      console.log(
        'Please create an issue to help us improve parsing: https://github.com/iulspop/slack-web-scraper/issues/new'
      )
      console.log('Title the issue "Parsing Error" and add the HTML element & error above.\n')
    }
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

function Post(time = '', sender = '', text = 'Placeholder Post (Means parsing failed for this post).', replies = []) {
  return {
    time,
    sender,
    text,
    replies,
  }
}

module.exports = { parsePostsToJson, parsePost, parseThread }
