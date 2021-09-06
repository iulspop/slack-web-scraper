require('dotenv').config();

const puppeteer = require('puppeteer');
const ensureLogin = require('./utils/ensureLogin');

(async () => {
  options = {
    headless: true,
    defaultViewport: {
      height: 2000,
      width: 1463
    }
  }
  const browser = await puppeteer.launch(options);
  const page    = await browser.newPage();
  await ensureLogin(page)

  await page.goto(process.env.SLACK_WORKSPACE_URL);

  await gotoChannel(page, 'the-spot')
  await page.waitForTimeout(1000)

  await page.screenshot({path: './screenshot.png'})
  await browser.close()
})();

async function gotoChannel(page, channelName) {
  let channels = await page.$$('.p-channel_sidebar__name')
  let [channelButton] = await filterByText(page, channels, channelName)
  await channelButton.click()
}

async function filterByText(page, elementHandles, textString) {
  filteredElementHandles = []
  for (let i = 0; i < elementHandles.length; i++) {
    let elementHandle = elementHandles[i]
    let text = await page.evaluate(element => element.textContent, elementHandle)
    if (text === textString) { filteredElementHandles.push(elementHandle) }
  }
  return filteredElementHandles
}
