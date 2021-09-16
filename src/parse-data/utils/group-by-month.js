const groupByDate = require('./group-by-date')

function groupByMonth(posts) {
  const postsGroupedByDates = groupByDate(months, posts)

  return postsGroupedByDates.map(group => {
    return {
      date: group.date.match(/(?<=, )\w+\b/)[0],
      posts: group.posts,
    }
  })
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

module.exports = groupByMonth
