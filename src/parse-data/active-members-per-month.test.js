const path = require('path')

const loadPosts = require('./utils/load-posts')
const activeMembersPerMonth = require('./active-members-per-month')

describe('activeMembersPerMonth', () => {
  it('calculates the active members per month from channel posts', () => {
    const posts = loadPosts(path.resolve(__dirname, '../example-data/threeWeeksofSignups.html'))
    let data = activeMembersPerMonth(posts)
    expect(data).toEqual([{"date": "September", "uniqueActiveMembers": 71}])
  })
})

