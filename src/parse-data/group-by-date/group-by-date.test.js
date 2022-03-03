const path = require('path')

const loadPosts = require('../utils/load-posts')
const groupByDate = require('./group-by-date')

describe('groupByDate', () => {
  it('Groups all channel feed posts by Thursdays', () => {
    let postsGroupedByDates = groupByDate(['Thursday'], loadPosts(path.resolve(__dirname, 'group-by-date.html')))
    expect(postsGroupedByDates).toEqual([
      {
        date: 'Thursday, September 9th',
        posts: ['<div></div>', '<div></div>'],
      },
    ])
  })

  it('Groups all channel feed posts by Mondays and Thursdays', () => {
    let postsGroupedByDates = groupByDate(
      ['Monday', 'Thursday'],
      loadPosts(path.resolve(__dirname, 'group-by-date.html'))
    )
    expect(postsGroupedByDates).toEqual([
      {
        date: 'Monday, August 30th',
        posts: ['<div></div>'],
      },
      {
        date: 'Thursday, September 9th',
        posts: ['<div></div>', '<div></div>'],
      },
    ])
  })
})
