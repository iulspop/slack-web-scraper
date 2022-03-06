/*

parse one file in slack-data.
  hardcode cli input in script X
  actually hardcode in the code for starters

pipe through intermediary transformations/files

timestamp.newline-encoded-pre-element.html
timestamp.filter-unexpected-elements.html
timestamp.group-by-date.json
timestamp.transform-posts-and-threads.json

timestamp.json

when debugging leave intermediary temp files

when not debugging, clean up and only keep timestamp.json

*/

/*

- load file into memo

- use cheerio to select all <pre> elements
- for each pre element
  - get innerText and replace newlines with '\n' characters

- write intermediary file, keep changes in memo

*/

const cheerio = require('cheerio')
const fs = require('fs')

const $ = cheerio.load(fs.readFileSync('src/parseData/pre-elements.html'))

const preElementHandles = $('pre')
preElementHandles.each((_, element) => {
  const newLineEncodedPreText = $(element).text().split('\n').join('\\n')
  $(element).text(newLineEncodedPreText)
})

const slackHTMLDataWithNewLineEncodedPreText = $.html()

fs.writeFileSync('src/parseData/pre-elements.newline-encoded-pre-elements.html', slackHTMLDataWithNewLineEncodedPreText)

/*

iterate over each line:
  - verify valid HTML element
  - verify is either date divider line, post or thread
  - filter out any line that doesn't pass check

*/

/*

group posts and threads by date

*/

/*

iterate over date groups:
  - if post,   parse post into json
  - if thread, parse thread into json

*/
