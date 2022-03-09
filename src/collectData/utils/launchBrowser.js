const puppeteer = require('puppeteer')

const HEADLESS_MODE = process.env.HEADLESS_MODE === 'true'

async function launchBrowser() {
  let options
  if (HEADLESS_MODE) {
    options = {
      headless: true,
      defaultViewport: { height: 6000, width: 1463 },
    }
  } else {
    options = {
      // set `headless` to false if want to see browser (helpful for testing)
      headless: false,
      // set `defaultViewport` to `null` if wish for viewport to resize according to window size like a normal browser
      defaultViewport: null,
      // set `defaultViewport` to whatever height and width is suitable (you may want to be larger so can scrape data in bigger batches before scrolling)
      // defaultViewport: { height: 4000, width: 1463 },
    }
  }
  const browser = await puppeteer.launch(options)
  if (HEADLESS_MODE) console.log('Headless browser launched successfully')
  const page = await browser.newPage()
  return { page, browser }
}

exports.launchBrowser = launchBrowser
