require('dotenv').config();

const puppeteer = require('puppeteer');
const ensureLogin = require('./utils/ensureLogin');

(async () => {
  options = {
    headless: true,
    defaultViewport: null
  }
  const browser = await puppeteer.launch(options);
  const page    = await browser.newPage();
  await ensureLogin(page)

  await page.goto(process.env.SLACK_WORKSPACE_URL);

  await page.screenshot({path: './screenshot.png'})
  await browser.close()
})();
