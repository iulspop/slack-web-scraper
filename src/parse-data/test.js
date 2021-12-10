const path = require('path')
const loadPosts = require('./utils/load-posts')
const studentsInterestedPerCoursePerWeek = require('./students-interested-per-course-per-week')
const activeMembersPerMonth = require('./active-members-per-month')

const posts = loadPosts(path.resolve(__dirname, '../../raw.html'))
console.log(studentsInterestedPerCoursePerWeek(posts))
console.log(activeMembersPerMonth(posts))
