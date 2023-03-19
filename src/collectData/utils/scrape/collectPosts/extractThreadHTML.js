async function extractThreadHTML(repliesButton, page) {
  await repliesButton.click()
  await repliesButton.click()
  await repliesButton.click()
  await repliesButton.click()

  const threadSelector = 'span.c-message__reply_bar_view_thread'
  
  try {
    const threadHandle = await page.waitForSelector(threadSelector)
    const threadHTML = await threadHandle.evaluate(thread => thread.outerHTML)

    const closeThreadButton = await page.$('[data-qa="close_flexpane"]')
    await closeThreadButton.click()

    return threadHTML
  } catch (error) {
    throw new Error(
      `\nError scraping thread. Skipping this thread. Potential Solution: If your Slack app is set to another language than English, please temporarily set it to English for the scrape. The thread selector will not work in other languages. Error: ${error.message}.`
    )
  }
}

exports.extractThreadHTML = extractThreadHTML
