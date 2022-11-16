const { isDebugMode } = require('../isDebugMode')
const { isValidPost, isValidThread } = require('../filterHTMLByValidElement')
const cheerio = require('cheerio')

const DEBUG_MODE = isDebugMode()

function parsePostsToJson(dateGroups) {
  const dateGroupsWithParsedPosts = dateGroups.map(dateGroup => {
    const parsedPosts = dateGroup.posts.map(html => {
      if (isValidThread(html)) return parseThread(html)
      if (isValidPost(html)) return parsePost(html)
    })
    return { ...dateGroup, posts: parsedPosts }
  })

  return dateGroupsWithParsedPosts
}

function parsePost(html) {
  const $ = cheerio.load(html)
  try {
    const dataTs = parseFloat($('.c-timestamp').attr('data-ts').trim())
    const timestamp = new Date(dataTs * 1000).toUTCString()
    const time = $('.c-timestamp')
      .attr('data-stringify-text')
      .replace(/[\[\]]/g, '')
    const sender = $('.c-message__sender_button').text()
    const text = $('.p-rich_text_section').html().trim()
    const reactions = []
    $('.c-reaction_bar > .c-reaction').each((_, reactionCheerioElement) => {
      try {
        const emoji = $(reactionCheerioElement).find('.c-emoji').first()
        const count = parseInt($(reactionCheerioElement).find('.c-reaction__count').first().text(), '10')

        reactions.push(Reaction(count, emoji.attr('data-stringify-emoji'), emoji.attr('src')))
      } catch (error) {
        console.error(error)
      }
    })
    return Post(timestamp, time, sender, text, [], reactions)
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

function Post(
  timestamp = '',
  time = '',
  sender = '',
  text = 'Placeholder Post (Means parsing failed for this post).',
  replies = [],
  reactions = []
) {
  return {
    timestamp,
    time,
    sender,
    text,
    replies,
    reactions,
  }
}

function Reaction(count, emojiAsText, emojiAsImage) {
  return {
    count,
    emojiAsText,
    emojiAsImage,
  }
}

module.exports = { parsePostsToJson, parsePost, parseThread }
