const groupByDate = require('./group-by-date')
const createDateGroup = require('./create-date-group')

function groupByMonth(posts) {
  const postsGroupedByDates = groupByDate(months, posts)
  const postGroups = mapDateToMonth(postsGroupedByDates)
  return mergeDateGroupsByMonth(postGroups)
}

const mapDateToMonth = groups =>
  groups.map(group => {
    return {
      date: group.date.match(/(?<=, )\w+\b/)[0],
      posts: group.posts,
    }
  })

const mergeDateGroupsByMonth = groups => {
  const mergedGroups = []

  months.forEach(month => {
    let monthGroup = createDateGroup(month)
    groups.forEach(group => {
      if (group.date === month) monthGroup.posts = [...monthGroup.posts, ...group.posts]
    })
    mergedGroups.push(monthGroup)
  })

  return mergedGroups.filter(monthGroup => monthGroup.posts.length !== 0)
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
