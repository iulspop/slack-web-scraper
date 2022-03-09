require('dotenv').config()

const { promptFileToParse } = require('./utils/promptFileToParse')
const { FileUtils } = require('./utils/FileUtils')
const { pipe } = require('./utils/pipe')
const { encodeNewlinePreElements } = require('./utils/encodeNewlinePreElements')
const { filterHTMLByValidElement } = require('./utils/filterHTMLByValidElement')
const { groupByDate } = require('./utils/groupByDate')
const { parsePostsToJson } = require('./utils/parsePostsToJson')

promptFileToParse().then(filePath => {
  // prettier-ignore
  const {
    readFile,
    leaveBreadcrumb,
    message,
    saveNewFileWithExtension,
    saveNewJSONFileWithExtension,
  } = FileUtils(filePath)

  const parseHTML = pipe(
    readFile,
    encodeNewlinePreElements,
    leaveBreadcrumb(
      message('Encoded newlines in pre elements.'),
      saveNewFileWithExtension('.0-newline-encoded-pre-elements.html')
    ),
    filterHTMLByValidElement,
    leaveBreadcrumb(
      message('Filtered unexpected elements.'),
      saveNewFileWithExtension('.1-filter-unexpected-elements.html')
    ),
    groupByDate,
    // prettier-ignore
    leaveBreadcrumb(
      message('Grouped elements by date.'),
      saveNewJSONFileWithExtension('.2-group-by-date.json')
    ),
    parsePostsToJson,
    // prettier-ignore
    leaveBreadcrumb(
      saveNewJSONFileWithExtension('.json'),
      saveNewJSONFileWithExtension('.3-parsed-posts.json')
    )
  )

  parseHTML()
})
