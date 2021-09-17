const groupByMonth = require('./group-by-month/group-by-month')
const countUniqueSenders = require('./count-unique-senders/count-unique-senders')

module.exports = activeMembersPerMonth

function activeMembersPerMonth(posts) {
  const months = groupByMonth(posts)

  months.forEach(month => {
    month.uniqueActiveMembers = countUniqueSenders(month.posts)
    delete month.posts
  })

  return months
}
