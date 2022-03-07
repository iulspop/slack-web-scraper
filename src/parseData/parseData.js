const { promptFileToParse } = require('./utils/promptFileToParse')
const { File } = require('./utils/file')
const { pipe } = require('./utils/pipe')
const { encodeNewlinePreElements } = require('./utils/encodeNewlinePreElements')
const { filterHTMLByValidElement } = require('./utils/filterHTMLByValidElement')
const { groupByDate } = require('./utils/groupByDate')
const { parsePostsToJson } = require('./utils/parsePostsToJson')

promptFileToParse().then(filePath => {
  const file = File(filePath)

  const parseHTML = pipe(
    file.read,
    encodeNewlinePreElements,
    file.saveNewWithExtension('.0-newline-encoded-pre-elements.html'),
    filterHTMLByValidElement,
    file.saveNewWithExtension('.1-filter-unexpected-elements.html'),
    groupByDate,
    file.saveNewWithExtension('.2-group-by-date.json'),
    parsePostsToJson,
    file.saveNewWithExtension('.3-parsed-posts.json')
  )

  parseHTML()
})
