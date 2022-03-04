async function closeBrowser(browser) {
  // Uncomment to save screenshot of  channel feed
  // Helpful to check if scraper successfully reached the top of the channel and scraped all the data in headless mode
  // await page.screenshot({ path: './screenshot.png' })
  await browser.close()
}

exports.closeBrowser = closeBrowser
