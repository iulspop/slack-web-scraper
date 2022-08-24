const { loadTestFile } = require('../loadTestFile')
const { groupByDate } = require('./index')

describe('groupByDate', () => {
  it('Group HTML by date', () => {
    let dateGroups = groupByDate(loadTestFile(__dirname, './group-by-date.html'))
    expect(dateGroups).toEqual([
      {
        timestamp: 'Mon, 29 Aug 2022 00:00:00 GMT',
        date: 'Monday, August 30th',
        posts: ['<div></div>'],
      },
      {
        timestamp: 'Thu, 08 Sep 2022 00:00:00 GMT',
        date: 'Thursday, September 9th',
        posts: ['<div></div>', '<div></div>'],
      },
    ])
  })
})
