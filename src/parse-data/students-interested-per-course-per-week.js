const groupByDate = require('./group-by-date/group-by-date')
const filterBySender = require('./filter-by-sender/filter-by-sender')
const groupByCourse = require('./group-by-course/group-by-course')
const countUniqueSenders = require('./count-unique-senders/count-unique-senders')
const copyObject = require('./utils/copy-object')

module.exports = studentsInterestedPerCoursePerWeek

function studentsInterestedPerCoursePerWeek(posts) {
  let thursdayGroups = groupByDate(['Thursday'], posts)

  thursdayGroups = thursdayGroups.map(thursday => {
    return mapObject(thursday, [
      thursday => {
        thursday.posts = filterBySender(/Slackbot/, thursday.posts)
      },
      thursday => {
        const courseGroup = groupByCourse(thursday.posts)
        thursday.courses = courseGroup
        delete thursday.posts
      },
      thursday => {
        const courses = thursday.courses
        for (let course in courses) {
          let signupPosts = courses[course]
          courses[course] = {
            studentsInterested: countUniqueSenders(signupPosts),
          }
        }
      },
    ])
  })

  return thursdayGroups
}

const mapObject = (object, fns) => {
  fns.forEach(fn => (object = copyObject(object, fn)))
  return object
}
