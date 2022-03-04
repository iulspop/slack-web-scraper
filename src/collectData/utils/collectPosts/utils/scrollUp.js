async function scrollUp(page, selector) {
  await page.hover(selector)
  await page.mouse.wheel({ deltaY: -8000 })
  await page.waitForNetworkIdle()
  await page.waitForTimeout(2000)
}

exports.scrollUp = scrollUp
