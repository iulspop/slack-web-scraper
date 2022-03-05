async function capturePosts(page, postsSelector) {
  const postHandles = await page.$$(postsSelector)
  const postsHTML = []

  // Starts at index 1 to skip first child element div.p-degraded_list__loading
  for (let i = 1; i < postHandles.length; i++) {
    const postHandle = postHandles[i]
    if (await postHandle.evaluate(post => post.alreadyCapturedByScrapper)) {
      console.log('broke at ' + i)
      break
    }

    const repliesButton = await postHandle.$('.c-message__reply_count')
    if (repliesButton) {
      await repliesButton.click()
      await repliesButton.click()
      await repliesButton.click()

      const threadSelector =
        '[data-qa="slack_kit_list"].c-virtual_list__scroll_container[role="list"][aria-label^="Thread"]'
      const threadHandle = await page.waitForSelector(threadSelector)
      const threadHTML = await threadHandle.evaluate(thread => thread.outerHTML)

      const closeThreadButton = await page.$('[aria-label="Close Right Sidebar"]')
      await closeThreadButton.click()

      postsHTML.push(threadHTML)
    } else {
      const postHTML = await postHandle.evaluate(post => post.outerHTML)
      postsHTML.push(postHTML)
    }

    await postHandle.evaluate(post => (post.alreadyCapturedByScrapper = true))
  }

  return postsHTML
}

exports.capturePosts = capturePosts
