const jsonfile = require('jsonfile')
const fs = require('fs/promises')

const COOKIES_FOLDER_PATH = 'cookies/'
const COOKIES_FILE_NAME = 'slack-session-cookies.json'
const COOKIES_FILE_PATH = COOKIES_FOLDER_PATH + COOKIES_FILE_NAME

async function loginToSlack(page) {
  try {
    const cookies = JSON.parse(await fs.readFile(COOKIES_FILE_PATH))
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
  await createFolderIfDoesntExist(COOKIES_FOLDER_PATH)
  jsonfile.writeFile(COOKIES_FILE_PATH, cookies, { spaces: 2 })
}

async function createFolderIfDoesntExist(folderPath) {
  try {
    await fs.stat(folderPath)
  } catch (error) {
    console.error(`${folderPath} directory doesn't exist.`)
    try {
      await fs.mkdir(folderPath)
      console.log('Created directory:', folderPath)
    } catch (error) {
      console.error('Failed to create directory.')
      throw error
    }
  }
}

exports.loginToSlack = loginToSlack
