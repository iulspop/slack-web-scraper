const { capturePosts } = require('./utils/capturePosts')
const { saveData } = require('./utils/saveData')
const { scrollUp } = require('./utils/scrollUp')
const { isScrolledToTop } = require('./utils/isScrolledToTop')

async function collectPosts(page) {
  let channelFeedSelector = '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"]'
  await page.waitForSelector(channelFeedSelector)
  const channelFeedHandle = await page.$(channelFeedSelector)

  do {
    const postHandles = await page.$$(`${channelFeedSelector} > div`)
    const postsHTML = await capturePosts(page, postHandles)
    saveData(postsHTML)
    await scrollUp(page, channelFeedSelector)
  } while (!(await isScrolledToTop(channelFeedHandle)))
}

exports.collectPosts = collectPosts
