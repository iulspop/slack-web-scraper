const SCROLL_UP_TIMEOUT = Number(process.env.SCROLL_UP_TIMEOUT)
const HEADLESS_MODE = process.env.HEADLESS_MODE === 'true'

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
      await page.mouse.wheel({ deltaY: -5000 })
      await page.waitForTimeout(1000)
      HEADLESS_MODE && (await page.waitForTimeout(1000))
    },
    async down() {
      await page.hover(channelFeedSelector)
      await page.mouse.wheel({ deltaY: 4000 })
      await page.waitForTimeout(500)
      HEADLESS_MODE && (await page.waitForTimeout(1000))
    },
    async isScrolledToTop() {
      // If channel feed is overflowing beyond the top of the viewport, then there's still more to scroll up.
      const check = async () => await channelFeedHandle.evaluate(el => el.getBoundingClientRect().top > 65)
      return await this.doubleCheck(check, 'top')
    },
    async isScrolledToBottom() {
      const check = async () =>
        await channelFeedHandle.evaluate(el => window.innerHeight - el.getBoundingClientRect().bottom > 120)
      return await this.doubleCheck(check, 'bottom')
    },
    async doubleCheck(check, type) {
      if (await check()) {
        type === 'top' ? await page.mouse.wheel({ deltaY: -75 }) : await page.mouse.wheel({ deltaY: 75 })
        console.log(`Double checking if scrolled to ${type === 'top' ? 'top' : 'bottom'}. Waiting seven seconds.`)
        await page.waitForTimeout(7000)
        const result = await check()
        console.log(`Double checked if scrolled to ${type === 'top' ? 'top' : 'bottom'}. Result: ${result}`)
        return result
      } else {
        return false
      }
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
