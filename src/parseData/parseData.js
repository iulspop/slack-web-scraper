const { promptFileToParse } = require('./utils/promptFileToParse')
const { FileUtils } = require('./utils/FileUtils')
const { pipe } = require('./utils/pipe')
const { encodeNewlinePreElements } = require('./utils/encodeNewlinePreElements')
const { filterHTMLByValidElement } = require('./utils/filterHTMLByValidElement')
const { groupByDate } = require('./utils/groupByDate')
const { parsePostsToJson } = require('./utils/parsePostsToJson')

promptFileToParse().then(filePath => {
  const { readFile, saveNewFileWithExtension, saveNewJSONFileWithExtension } = FileUtils(filePath)

  const parseHTML = pipe(
    readFile,
    encodeNewlinePreElements,
    saveNewFileWithExtension('.0-newline-encoded-pre-elements.html'),
    filterHTMLByValidElement,
    saveNewFileWithExtension('.1-filter-unexpected-elements.html'),
    groupByDate,
    saveNewJSONFileWithExtension('.2-group-by-date.json'),
    parsePostsToJson,
    saveNewJSONFileWithExtension('.3-parsed-posts.json')
  )

  parseHTML()
})
