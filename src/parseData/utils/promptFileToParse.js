const fs = require('fs/promises')
const inquirer = require('inquirer')

const SLACK_DATA_FOLDER_PATH = 'slack-data/'

async function promptFileToParse() {
  const defaultFilePath = await getDefaultFilePath()
  const { filePath } = await prompt(defaultFilePath)
  return filePath
}

async function getDefaultFilePath() {
  try {
    const fileList = await fs.readdir(SLACK_DATA_FOLDER_PATH)
    const mostRecentScrapedDataFile = fileList[fileList.length - 1]
    return SLACK_DATA_FOLDER_PATH + mostRecentScrapedDataFile
  } catch (error) {
    console.log("Couldn't load scraped data file list from directory:", SLACK_DATA_FOLDER_PATH)
    console.log('Should run `npm run collect` to scrape Slack data first before parsing.')
    return null
  }
}

async function prompt(defaultFilePath) {
  let questions = {
    name: 'filePath',
    message: 'Enter the path to the file to parse (defaults to most recent):',
    validate: validateFilePath,
  }
  if (defaultFilePath) questions = { ...questions, default: defaultFilePath }
  return await inquirer.prompt(questions)
}

async function validateFilePath(filePath) {
  try {
    await fs.stat(filePath)
    return true
  } catch (error) {
    console.log('\nFile path is invalid. Please enter a valid path to a scraped data file.')
    console.error(error)
    return false
  }
}

exports.promptFileToParse = promptFileToParse
