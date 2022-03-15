async function extractThreadHTML(repliesButton, page) {
  await repliesButton.click()
  await repliesButton.click()
  await repliesButton.click()
  await repliesButton.click()

  const threadSelector =
    '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"][aria-label^="Thread"]'
  const threadHandle = await page.waitForSelector(threadSelector)
  const threadHTML = await threadHandle.evaluate(thread => thread.outerHTML)

  const closeThreadButton = await page.$('[aria-label="Close Right Sidebar"]')
  await closeThreadButton.click()

  return threadHTML
}

exports.extractThreadHTML = extractThreadHTML
