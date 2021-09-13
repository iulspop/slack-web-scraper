require('dotenv').config();

const puppeteer = require('puppeteer');
const ensureLogin = require('./utils/ensure-login');
const gotoChannel = require('./utils/goto-channel');
const saveData = require('./utils/save-data');

(async () => {
  options = {
    headless: true,
    defaultViewport: { height: 3000, width: 1463 }
  }
  const browser = await puppeteer.launch(options)
  const page    = await browser.newPage()
  await ensureLogin(page)

  await page.goto(process.env.SLACK_WORKSPACE_URL)
  await gotoChannel(page, 'the-spot')
  await page.waitForTimeout(10000)

  const channelFeedID = '[aria-label="the-spot (channel)"]'
  const postHandles = await page.$$(`${channelFeedID} > div`)

  const postsHTML = []
  for (let i = 0; i < postHandles.length; i++) {
    const postHandle = postHandles[i]
    const repliesButton = await postHandle.$('.c-message__reply_count')

    if (repliesButton) {
      await repliesButton.click()
      const threadHandle = await page.waitForSelector('[aria-label="Thread in the-spot (channel)"]')
      const threadHTML   = await threadHandle.evaluate(thread => thread.outerHTML)

      postsHTML.push(threadHTML)
    }

    else {
      const postHTML = await postHandle.evaluate(post => post.outerHTML)

      postsHTML.push(postHTML)
    }
  }

  saveData(postsHTML.join('\n'))

  await page.screenshot({path: './screenshot.png'})
  await browser.close()
})()
