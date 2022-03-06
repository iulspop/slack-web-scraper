const { Date } = require('sugar')
const cheerio = require('cheerio')

function groupByDate(html) {
  const htmlLines = html.split('\n')

  const dateGroups = []
  let dateGroup
  htmlLines.forEach(html => {
    if (isDateDividerLine(html)) {
      dateGroup = DateGroup(dateText(html))
      dateGroups.push(dateGroup)
    } else if (dateGroup) {
      dateGroup.posts.push(html)
    }
  })

  return JSON.stringify(dateGroups)
}

function DateGroup(date) {
  const timestamp = Date.create(date).toUTCString()
  return { timestamp, date, posts: [] }
}

const isDateDividerLine = post => post.match('.c-message_list__day_divider__label__pill"')
const dateText = post => cheerio.load(post)('.c-message_list__day_divider__label__pill').text()

exports.groupByDate = groupByDate
