const { capturePosts } = require('./capturePosts')
const { saveData } = require('./saveData')
const { scrollUp } = require('./scrollUp')
const { isScrolledToTop } = require('./isScrolledToTop')

async function collectAndSavePostsAndThreads(page) {
  const channelFeedSelector = `[aria-label="${process.env.CHANNEL_FEED_NAME} (channel)"]`
  await page.waitForSelector(channelFeedSelector)
  const channelFeedHandle = await page.$(channelFeedSelector)

  do {
    const postHandles = await page.$$(`${channelFeedSelector} > div`)
    const postsHTML = await capturePosts(page, postHandles)
    saveData(postsHTML)
    await scrollUp(page, channelFeedSelector)
  } while (!(await isScrolledToTop(channelFeedHandle)))
}

exports.collectAndSavePostsAndThreads = collectAndSavePostsAndThreads
