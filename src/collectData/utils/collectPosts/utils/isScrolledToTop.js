async function isScrolledToTop(elementHandle) {
  return await elementHandle.evaluate(el => el.getBoundingClientRect().y > 0)
}

exports.isScrolledToTop = isScrolledToTop
