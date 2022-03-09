const { ScrollFeed } = require('./scrollFeed')
const { initSlackDataFile } = require('./initSlackDataFile')
const { extractPostsHTML } = require('./extractPostsHTML')

async function collectPosts(page, info) {
  const channelFeedSelector = '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"]'
  const postsSelector = `${channelFeedSelector} > div`

  const scrollFeed = await ScrollFeed(page, channelFeedSelector)
  await scrollFeed.toTop()

  const appendHTMLToSlackDataFile = await initSlackDataFile(info)
  await scrollFeed.toBottom(async () => {
    const postsHTML = await extractPostsHTML(page, postsSelector)
    appendHTMLToSlackDataFile(postsHTML)
  })
}

exports.collectPosts = collectPosts
