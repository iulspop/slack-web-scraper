require('dotenv').config()

const { recordScrapeDuration } = require('./utils/recordScrapeDuration')
const { launchBrowser } = require('./utils/launchBrowser')
const { loginToSlack } = require('./utils/loginToSlack')
const { gotoWorkspace } = require('./utils/gotoWorkspace')
const { throwErrorIfNoConversationOrChannel } = require('./utils/scrape/parseNames')
const { scrapeConversations, scrapeChannels } = require('./utils/scrape')
const { closeBrowser } = require('./utils/closeBrowser')

;(async () => {
  recordScrapeDuration()
  const { page, browser } = await launchBrowser()

  await loginToSlack(page)
  await gotoWorkspace(page)

  throwErrorIfNoConversationOrChannel()
  await scrapeConversations(page)
  await scrapeChannels(page)

  await closeBrowser(browser)
})()
