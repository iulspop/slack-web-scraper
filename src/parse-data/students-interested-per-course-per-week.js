const groupByDate = require('./group-by-date/group-by-date')
const filterBySender = require('./filter-by-sender/filter-by-sender')
const groupByCourse = require('./group-by-course/group-by-course')
const countUniqueSenders = require('./count-unique-senders/count-unique-senders')

module.exports = studentsInterestedPerCoursePerWeek

function studentsInterestedPerCoursePerWeek(posts) {
  let thursdayGroups = groupByDate(['Thursday'], posts)

  return thursdayGroups.map(thursday => {
    thursday.posts = filterBySender(/Slackbot/, thursday.posts)

    const courseGroup = groupByCourse(thursday.posts)
    thursday.courses = courseGroup
    delete thursday.posts

    const courses = thursday.courses
    for (let course in courses) {
      let signupPosts = courses[course]
      courses[course] = countUniqueSenders(signupPosts)
    }

    return thursday
  })
}
