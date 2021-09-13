require('dotenv').config();

const puppeteer = require('puppeteer');
const ensureLogin = require('./utils/ensure-login');
const gotoChannel = require('./utils/goto-channel');
const saveData = require('./utils/save-data');

(async () => {
  options = {
    headless: true,
    defaultViewport: {
      height: 20000,
      width: 1463
    }
  }
  const browser = await puppeteer.launch(options);
  const page    = await browser.newPage();
  await ensureLogin(page)

  await page.goto(process.env.SLACK_WORKSPACE_URL);
  await gotoChannel(page, 'the-spot')
  await page.waitForTimeout(10000)

  let channelFeedHandle = await page.$('[aria-label="the-spot (channel)"]')
  let postsHTML = await page.evaluate(channelFeed => {
    let posts = channelFeed.children

    let postData = []
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      postData.push(post.outerHTML)
    }

    return postData
  }, channelFeedHandle)

  saveData(postsHTML.join('\n'))

  await page.screenshot({path: './screenshot.png'})
  await browser.close()
})()
