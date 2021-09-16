const channelFeed = require('./channel-feed')
const groupByMonth = require('./group-by-month')

describe('groupByMonth', () => {
  it('Groups all channel feed posts by month of the year', () => {
    let postsGroupedByDates = groupByMonth(channelFeed('./fixtures/group-by-month.html'))
    // prettier-ignore
    expect(postsGroupedByDates).toEqual([
      { date: 'January',   posts: ['<div></div>'] },
      { date: 'February',  posts: ['<div></div>'] },
      { date: 'March',     posts: ['<div></div>'] },
      { date: 'April',     posts: ['<div></div>'] },
      { date: 'May',       posts: ['<div></div>'] },
      { date: 'June',      posts: ['<div></div>'] },
      { date: 'July',      posts: ['<div></div>'] },
      { date: 'August',    posts: ['<div></div>'] },
      { date: 'September', posts: ['<div></div>'] },
      { date: 'October',   posts: ['<div></div>'] },
      { date: 'November',  posts: ['<div></div>'] },
      { date: 'December',  posts: ['<div></div>'] },
    ])
  })
})
