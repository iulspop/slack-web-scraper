async function isScrolledToTop(elementHandle) {
  // Checks if channel feed is not overflowing the top of the viewport, which means it's scrolled to the top of the feed.
  // Inversely, if it's overflowing over the top of the viewport, it means there's still more to scroll up.
  return await elementHandle.evaluate(el => el.getBoundingClientRect().top > 0)
}

exports.isScrolledToTop = isScrolledToTop
