const SCROLL_UP_TIMEOUT = Number(process.env.SCROLL_UP_TIMEOUT)
const HEADLESS_MODE = process.env.HEADLESS_MODE === 'true'

async function ScrollFeed(page, channelFeedSelector) {
  const channelFeedHandle = await page.waitForSelector(channelFeedSelector)

  return {
    async toTop(onScrollCallback = async () => {}) {
      const startTime = new Date()
      await page.waitForTimeout(500)
      console.log('Clicking date navigation')
      await page.click('button.c-message_list__day_divider__label__pill')
      await page.waitForTimeout(500)
      console.log('Clicking the very beginning')
      const button = await page.$x("//div[@class='c-menu_item__li']")
      await button[button.length-2].click()
      await page.waitForTimeout(1000)
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
      console.log(`el.getBoundingClientRect().top is ${await channelFeedHandle.evaluate(el => el.getBoundingClientRect().top)}`) // values usually between -1600 and -3700
      const check = async () => await channelFeedHandle.evaluate(el => el.getBoundingClientRect().top > 0)
      return await this.doubleCheck(check, 'top')
    },
    async isScrolledToBottom() {
      console.log(`el.getBoundingClientRect().bottom is ${await channelFeedHandle.evaluate(el => el.getBoundingClientRect().bottom)}`) // values usually between 
      const check = async () =>
        await channelFeedHandle.evaluate(el => window.innerHeight - el.getBoundingClientRect().bottom > 500)
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
