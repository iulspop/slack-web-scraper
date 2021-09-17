const path = require('path')

const loadPosts = require('../utils/load-posts')
const groupByCourse = require('./group-by-course')

describe('groupByCourse', () => {
  it('Groups signup posts by the course they belong to', () => {
    let courseGroups = groupByCourse(loadPosts(path.resolve(__dirname, 'group-by-course.html')))
    expect(courseGroups).toEqual({
      RB101: ['<span>Reminder: <br/><b>Ruby 101-109 Study Session: Sign Up Here!</b></span>'],
      JS101: ['<span>Reminder: <br/><b>JS 101-109 & 210-211 Study Session: Sign Up Here!</b></span>'],
      RB120: ['<span>Reminder: <br/><b>Ruby 121-129 Study Session: Sign Up Here!</b></span>'],
      JS120: ['<span>Reminder: <br/><b>JS 120-129 & 225-229 Study Session: Sign Up Here!</b></span>'],
      RB130: ['<span>Reminder: <br/><b>Ruby 130-139 Study Session: Sign Up Here!</b></span>'],
      JS130: ['<span>Reminder: <br/><b>JS 130-139 Study Session: Sign Up Here!</b></span>'],
      LS170: ['<span>Reminder: <br/><b>LS 170-171 Study Session: Sign Up Here!</b></span>'],
      RB175: ['<span>Reminder: <br/><b>Ruby 175 Study Session: Sign Up Here!</b></span>'],
      JS175: ['<span>Reminder: <br/><b>JS 175 Study Session: Sign Up Here!</b></span>'],
      LS180: ['<span>Reminder: <br/><b>LS 180-181 Study Session: Sign Up Here!</b></span>'],
      RB185: ['<span>Reminder: <br/><b>Ruby 185 Study Session: Sign Up Here!</b></span>'],
      JS185: ['<span>Reminder: <br/><b>JS 185 Study Session: Sign Up Here!</b></span>'],
      JS210: ['<span>Reminder: <br/><b>JS 101-109 & 210-211 Study Session: Sign Up Here!</b></span>'],
      LS215: ['<span>Reminder: <br/><b>LS 215-216 Study Session: Sign Up Here!</b></span>'],
      JS225: ['<span>Reminder: <br/><b>JS 120-129 & 225-229 Study Session: Sign Up Here!</b></span>'],
      JS230: ['<span>Reminder: <br/><b>JS 230-239 Study Session: Sign Up Here!</b></span>'],
    })
  })
})
