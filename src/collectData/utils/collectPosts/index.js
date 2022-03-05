const { ScrollFeed } = require('./utils/scrollFeed')
const { initSlackDataFile } = require('./utils/initSlackDataFile')
const { extractPostsHTML } = require('./utils/extractPostsHTML')

async function collectPosts(page) {
  const channelFeedSelector = '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"]'
  const postsSelector = `${channelFeedSelector} > div`

  const scrollFeed = await ScrollFeed(page, channelFeedSelector)
  await scrollFeed.toTop()

  const appendHTMLToSlackDataFile = await initSlackDataFile()
  await scrollFeed.toBottom(async () => {
    const postsHTML = await extractPostsHTML(page, postsSelector)
    appendHTMLToSlackDataFile(postsHTML)
  })
}

exports.collectPosts = collectPosts
