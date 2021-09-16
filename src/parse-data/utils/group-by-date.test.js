const channelFeed = require('./channel-feed')
const groupByDate = require('./group-by-date')

describe('groupByDate', () => {
  it('Groups all channel feed posts by Thursdays', () => {
    let postsGroupedByDates = groupByDate('Thursday', channelFeed('./fixtures/group-by-date.html'))
    expect(postsGroupedByDates).toEqual([
      {
        date: 'Thursday, August 5th',
        posts: ['<div></div>', '<div></div>'],
      },
    ])
  })
})
