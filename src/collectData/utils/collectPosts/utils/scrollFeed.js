const SCROLL_UP_TIMEOUT = process.env.SCROLL_UP_TIMEOUT

async function ScrollFeed(page, channelFeedSelector) {
  const channelFeedHandle = await page.waitForSelector(channelFeedSelector)

  return {
    async toTop(onScrollCallback = async () => {}) {
      const startTime = new Date()
      do {
        await onScrollCallback()
        await this.up()
        if (SCROLL_UP_TIMEOUT && differenceInSeconds(startTime, new Date()) > SCROLL_UP_TIMEOUT) break
      } while (!(await this.isScrolledToTop()))
    },
    async toBottom(onScrollCallback = async () => {}) {
      do {
        await onScrollCallback()
        await this.down()
      } while (!(await this.isScrolledToBottom()))
    },
    async up() {
      await page.hover(channelFeedSelector)
      await page.mouse.wheel({ deltaY: -50000 })
      await page.waitForNetworkIdle()
    },
    async down() {
      await page.hover(channelFeedSelector)
      await page.mouse.wheel({ deltaY: 8000 })
      await page.waitForNetworkIdle()
    },
    async isScrolledToTop() {
      // If channel feed is overflowing beyond the top of the viewport, then there's still more to scroll up.
      return await channelFeedHandle.evaluate(el => el.getBoundingClientRect().top > 0)
    },
    async isScrolledToBottom() {
      return await channelFeedHandle.evaluate(el => window.innerHeight - el.getBoundingClientRect().bottom > 0)
    },
  }
}

function differenceInSeconds(startTime, endTime) {
  return Math.floor((endTime - startTime) / 1000)
}

exports.ScrollFeed = ScrollFeed
