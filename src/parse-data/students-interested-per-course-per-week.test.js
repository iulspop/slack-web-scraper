const path = require('path')

const loadPosts = require('./utils/load-posts')
const studentsInterestedPerCoursePerWeek = require('./students-interested-per-course-per-week')

describe('studentsInterestedPerCoursePerWeek', () => {
  it('calculates number of student interested per course per week from channel posts', () => {
    const posts = loadPosts(path.resolve(__dirname, '../example-data/threeWeeksofSignups.html'))
    let data = studentsInterestedPerCoursePerWeek(posts)
    expect(data).toEqual([
      {
        date: 'Thursday, September 2nd',
        courses: {
          JS101: { studentsInterested: 11 }, // not working
          JS120: { studentsInterested: 3 },
          JS130: { studentsInterested: 4 },
          JS175: { studentsInterested: 0 },
          JS185: { studentsInterested: 0 },
          JS210: { studentsInterested: 11 }, // not working
          JS225: { studentsInterested: 3 }, // not wokring
          JS230: { studentsInterested: 0 },
          LS170: { studentsInterested: 2 },
          LS180: { studentsInterested: 3 },
          LS215: { studentsInterested: 2 },
          RB101: { studentsInterested: 11 },
          RB120: { studentsInterested: 10 },
          RB130: { studentsInterested: 1 },
          RB175: { studentsInterested: 0 },
          RB185: { studentsInterested: 0 },
        },
      },
      {
        date: 'Thursday, September 9th',
        courses: {
          JS101: { studentsInterested: 13 },
          JS120: { studentsInterested: 3 },
          JS130: { studentsInterested: 0 },
          JS175: { studentsInterested: 0 },
          JS185: { studentsInterested: 0 },
          JS210: { studentsInterested: 13 }, // not working
          JS225: { studentsInterested: 3 }, // not working
          JS230: { studentsInterested: 0 },
          LS170: { studentsInterested: 6 }, // not working
          LS180: { studentsInterested: 3 },
          LS215: { studentsInterested: 4 },
          RB101: { studentsInterested: 10 },
          RB120: { studentsInterested: 11 },
          RB130: { studentsInterested: 0 },
          RB175: { studentsInterested: 0 },
          RB185: { studentsInterested: 0 },
        },
      },
      {
        date: 'Thursday, September 16th',
        courses: {
          JS101: { studentsInterested: 7 },
          JS120: { studentsInterested: 3 },
          JS130: { studentsInterested: 2 },
          JS175: { studentsInterested: 0 },
          JS185: { studentsInterested: 0 },
          JS210: { studentsInterested: 7 }, // not working
          JS225: { studentsInterested: 3 }, // not working
          JS230: { studentsInterested: 1 },
          LS170: { studentsInterested: 5 },
          LS180: { studentsInterested: 1 },
          LS215: { studentsInterested: 1 },
          RB101: { studentsInterested: 6 },
          RB120: { studentsInterested: 5 },
          RB130: { studentsInterested: 3 },
          RB175: { studentsInterested: 1 },
          RB185: { studentsInterested: 1 },
        },
      },
    ])
  })
})
