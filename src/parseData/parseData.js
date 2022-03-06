const { File } = require('./utils/file')
const { pipe } = require('./utils/pipe')
const { encodeNewlinePreElements } = require('./utils/encodeNewlinePreElements')
const { filterHTMLByValidElement } = require('./utils/filterHTMLByValidElement')
const { groupByDate } = require('./utils/groupByDate')

const filePath = 'slack-data/2022-03-05-17-52-34.html'
const file = File(filePath)

const parseHTML = pipe(
  file.read,
  encodeNewlinePreElements,
  file.saveNewWithExtension('.0-newline-encoded-pre-elements.html'),
  filterHTMLByValidElement,
  file.saveNewWithExtension('.1-filter-unexpected-elements.html'),
  groupByDate,
  file.saveNewWithExtension('.2-group-by-date.json')
  // parsePostsToJson,
  // file.saveNewWithExtension('.json')
)

parseHTML()
