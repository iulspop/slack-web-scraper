const jsonfile = require('jsonfile')
const fs = require('fs')

module.exports = ensureLogin

async function ensureLogin(page) {
  try {
    const cookies = JSON.parse(fs.readFileSync(process.env.COOKIES_FILE_PATH))
    for (let cookie of cookies) {
      await page.setCookie(cookie)
    }
  } catch {
    await loginAndSaveCookies(page)
  }
}

async function loginAndSaveCookies(page) {
  await page.goto(process.env.SLACK_WORKSPACE_URL)

  await page.type('#email', process.env.SLACK_EMAIL)
  await page.type('#password', process.env.SLACK_PASSWORD)
  await page.click('#signin_btn')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })

  const cookies = await page.cookies()
  saveCookies(cookies)
}

async function saveCookies(cookies) {
  jsonfile.writeFile(process.env.COOKIES_FILE_PATH, cookies, { spaces: 2 })
}
