module.exports = capturePosts

async function capturePosts(page, postHandles) {
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
      const threadHandle = await page.waitForSelector('[aria-label="Thread in the-spot (channel)"]')
      const threadHTML = await threadHandle.evaluate(thread => thread.outerHTML)
      postsHTML.push(threadHTML)
    } else {
      const postHTML = await postHandle.evaluate(post => post.outerHTML)
      postsHTML.push(postHTML)
    }

    await postHandle.evaluate(post => (post.alreadyCapturedByScrapper = true))
  }

  return postsHTML
}
