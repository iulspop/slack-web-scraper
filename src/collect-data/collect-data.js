require('dotenv').config()

const puppeteer = require('puppeteer')
const ensureLogin = require('./utils/ensure-login')
const gotoChannel = require('./utils/goto-channel')
const capturePosts = require('./utils/capture-posts')
const saveData = require('./utils/save-data')
const scrollUp = require('./utils/scroll-up')
const isScrolledToTop = require('./utils/is-scrolled-to-top')

;(async () => {
  const startTime = new Date()
  const options = {
    // set `headless` to false if want to see browser (helpful for testing)
    headless: false,
    // set `defaultViewport` to `null` if wish for viewport to resize according to window size like a normal browser
    defaultViewport: null,
    // set `defaultViewport` to whatever height and width is suitable (you may want to be larger so can scrape data in bigger batches before scrolling)
    // defaultViewport: { height: 4000, width: 1463 },
  }
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()

  await ensureLogin(page)

  await page.goto(process.env.SLACK_WORKSPACE_URL)
  await page.waitForNavigation({ waitUntil: 'load' })
  await gotoChannel(page, 'the-spot')

  const channelFeedName = 'the-spot (channel)'
  const channelFeedSelector = `[aria-label="${channelFeedName}"]`
  await page.waitForSelector(channelFeedSelector)
  const channelFeedHandle = await page.$(channelFeedSelector)

  do {
    const postHandles = await page.$$(`${channelFeedSelector} > div`)
    const postsHTML = await capturePosts(page, postHandles)
    saveData(postsHTML)
    await scrollUp(page, channelFeedSelector)
  } while (!(await isScrolledToTop(channelFeedHandle)))

  await page.screenshot({ path: './screenshot.png' })
  await browser.close()

  const endTime = new Date()
  const duration = (endTime - startTime) / 1000
  console.log(`The operation took ${duration} seconds`)
})()
