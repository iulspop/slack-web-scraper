const { capturePosts } = require('./utils/capturePosts')
const { saveData } = require('./utils/saveData')
const { scrollUp } = require('./utils/scrollUp')
const { isScrolledToTop } = require('./utils/isScrolledToTop')

async function collectPosts(page) {
  const channelFeedSelector = '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"]'
  const postsSelector = `${channelFeedSelector} > div`
  const channelFeedHandle = await page.waitForSelector(channelFeedSelector)

  do {
    const postsHTML = await capturePosts(page, postsSelector)
    saveData(postsHTML)
    await scrollUp(page, channelFeedSelector)
  } while (!(await isScrolledToTop(channelFeedHandle)))
}

exports.collectPosts = collectPosts
