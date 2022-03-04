require('dotenv').config()

const { recordTime } = require('./utils/recordTime')
const { launchBrowser } = require('./utils/launchBrowser')
const { loginToSlack } = require('./utils/loginToSlack')
const { gotoChannel } = require('./utils/gotoChannel')
const { gotoWorkspace } = require('./utils/gotoWorkspace')
const { collectAndSavePostsAndThreads } = require('./utils/collectAndSavePostsAndThreads')
const { closeBrowser } = require('./utils/closeBrowser')

;(async () => {
  recordTime()
  const { page, browser } = await launchBrowser()

  await loginToSlack(page)
  await gotoWorkspace(page)
  await gotoChannel(page)

  await collectAndSavePostsAndThreads(page)

  await closeBrowser(browser)
})()
