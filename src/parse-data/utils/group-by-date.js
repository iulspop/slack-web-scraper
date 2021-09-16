const cheerio = require('cheerio')

function groupByDate(dates, posts) {
  const postsGroupedByDates = []
  let currentDate

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]

    if (date && matches) {

    } else if (currentDate) {
      postsGroupedByDates.push({date: currentDate, posts: [post]})
    }
  }
  return {}
}

function isDatePost(post) {
  
}

module.exports = groupByDate
