async function extractThreadHTML(repliesButton, page) {
  await repliesButton.click()
  await repliesButton.click()
  await repliesButton.click()
  await repliesButton.click()

  const threadSelector =
    '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"][aria-label^="Thread"]'
  try {
    const threadHandle = await page.waitForSelector(threadSelector)
    const threadHTML = await threadHandle.evaluate(thread => thread.outerHTML)

    const closeThreadButton = await page.$('[aria-label="Close secondary view"]')
    await closeThreadButton.click()

    return threadHTML
  } catch (error) {
    throw new Error(
      `\nError scraping thread. Skipping this thread. Potential Solution: If your Slack app is set to another language than English, please temporarily set it to English for the scrape. The thread selector will not work in other languages. Error: ${error.message}.`
    )
  }
}

exports.extractThreadHTML = extractThreadHTML
