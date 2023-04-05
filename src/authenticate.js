require('dotenv').config()
const { saveCookies } = require('./collectData/utils/loginToSlack.js')

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function launchBrowser() {
  const options = {
    headless: false,
    defaultViewport: null,
  }

  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  return { page, browser }
}

;(async () => {
  const { page, browser } = await launchBrowser()
  await page.goto(process.env.SLACK_WORKSPACE_URL)

  rl.question('Press "enter" after you have completed authentication to save cookies', () => {
    page.cookies().then(cookies => {
      saveCookies(cookies)
      console.log("Succesfully saved cookies.")
      console.log("You can now close the browser and run the collect script.")
      rl.close()
    })
  })
})()