const fs = require('fs/promises')
const inquirer = require('inquirer')

const SLACK_DATA_FOLDER_PATH = 'slack-data/'

async function promptFileToParse() {
  const defaultFilePaths = await getDefaultFilePaths()
  const { filePath } = await prompt(defaultFilePaths)
  return filePath
}

async function getDefaultFilePaths() {
  try {
    const fileList = await fs.readdir(SLACK_DATA_FOLDER_PATH)
    const htmlFileList = fileList.filter(filePath => filePath.match(/\.html$/))
    return htmlFileList.map(filePath => SLACK_DATA_FOLDER_PATH + filePath)
  } catch (error) {
    console.log("Couldn't load scraped data file list from directory:", SLACK_DATA_FOLDER_PATH)
    console.log('Should run `npm run collect` to scrape Slack data first before parsing.')
    return null
  }
}

async function prompt(defaultFilePaths) {
  let questions = {
    type: 'list',
    name: 'filePath',
    message: 'Enter the path to the file to parse:',
    choices: defaultFilePaths,
    validate: validateFilePath,
  }
  const defaultFilePath = defaultFilePaths[defaultFilePaths.length - 1]
  if (defaultFilePath) questions = { ...questions, default: defaultFilePath }
  return await inquirer.prompt(questions)
}

async function validateFilePath(filePath) {
  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) throw new Error('Not a file')
    if (!filePath.match(/\.html$/)) throw new Error('Not an HTML file')
    return true
  } catch (error) {
    console.log('\n\nFile path is invalid. Please enter a valid path to an HTML file of scraped data.')
    console.error(error, '\n')
    return false
  }
}

exports.promptFileToParse = promptFileToParse
