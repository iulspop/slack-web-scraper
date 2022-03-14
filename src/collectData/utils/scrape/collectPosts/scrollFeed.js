const SCROLL_UP_TIMEOUT = Number(process.env.SCROLL_UP_TIMEOUT)

async function ScrollFeed(page, channelFeedSelector) {
  const channelFeedHandle = await page.waitForSelector(channelFeedSelector)

  return {
    async toTop(onScrollCallback = async () => {}) {
      const startTime = new Date()
      console.log('Scrolling to top...', getHoursAndMinutesTimestamp())
      do {
        await onScrollCallback()
        await this.up()
        if (SCROLL_UP_TIMEOUT && differenceInSeconds(startTime, new Date()) >= SCROLL_UP_TIMEOUT) {
          console.log(`Scroll up timed out after ${differenceInSeconds(startTime, new Date())} seconds`)
          break
        }
      } while (!(await this.isScrolledToTop()))
      console.log('Scrolled to top.', getHoursAndMinutesTimestamp())
    },
    async toBottom(onScrollCallback = async () => {}) {
      do {
        await onScrollCallback()
        await this.down()
      } while (!(await this.isScrolledToBottom()))
    },
    async up() {
      await page.hover(channelFeedSelector)
      await page.mouse.wheel({ deltaY: -6000 })
      try {
        await page.waitForNetworkIdle()
      } catch (error) {
        console.error('Wait for networked timedout. Redoing scroll up.')
      }
    },
    async down() {
      await page.hover(channelFeedSelector)
      await page.mouse.wheel({ deltaY: 4000 })
      try {
        await page.waitForNetworkIdle()
      } catch (error) {
        console.error('Wait for networked timedout. Redoing scroll down.')
      }
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

function getHoursAndMinutesTimestamp() {
  const currentTime = new Date()
  return `${currentTime.getHours()}:${currentTime.getMinutes()} ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`
}

exports.ScrollFeed = ScrollFeed
