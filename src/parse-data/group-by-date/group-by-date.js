const cheerio = require('cheerio')

const createDateGroup = require('../utils/create-date-group')

module.exports = groupByDate

function groupByDate(datesGroupedBy, posts) {
  const postsGroupedByDates = []
  let dateGroup

  posts.forEach(post => {
    if (isDatePost(post) && datesGroupedBy.some(date => dateText(post).match(date))) {
      dateGroup = createDateGroup(dateText(post))
      postsGroupedByDates.push(dateGroup)
    } else if (dateGroup) {
      dateGroup.posts.push(post)
    }
  })

  return postsGroupedByDates
}

const isDatePost = post => post.match('.c-message_list__day_divider__label__pill"')
const dateText = post => cheerio.load(post)('.c-message_list__day_divider__label__pill').text()
