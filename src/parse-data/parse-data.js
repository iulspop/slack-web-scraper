const path = require('path')

const loadPosts = require('./utils/load-posts')
const activeMembersPerMonth = require('./active-members-per-month')
const studentsInterestedPerCoursePerWeek = require('./students-interested-per-course-per-week')

const posts = loadPosts(path.resolve(__dirname, '../../raw.html'))

console.log(activeMembersPerMonth(posts))
studentsInterestedPerCoursePerWeek(posts).forEach(week => console.log(week))
