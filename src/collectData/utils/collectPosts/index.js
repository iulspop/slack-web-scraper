const { extractPostsHTML } = require('./utils/extractPostsHTML')
const { initSlackDataFile } = require('./utils/initSlackDataFile')
const { scrollUp } = require('./utils/scrollUp')
const { isScrolledToTop } = require('./utils/isScrolledToTop')

async function collectPosts(page) {
  const channelFeedSelector = '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"]'
  const postsSelector = `${channelFeedSelector} > div`
  const channelFeedHandle = await page.waitForSelector(channelFeedSelector)

  const appendHTMLToSlackDataFile = await initSlackDataFile()
  do {
    const postsHTML = await extractPostsHTML(page, postsSelector)
    appendHTMLToSlackDataFile(postsHTML)
    await scrollUp(page, channelFeedSelector)
  } while (!(await isScrolledToTop(channelFeedHandle)))
}

exports.collectPosts = collectPosts
