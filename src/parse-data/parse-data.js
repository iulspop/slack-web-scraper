const path = require('path')

const loadPosts = require('./utils/load-posts')
const activeMembersPerMonth = require('./active-members-per-month')

const posts = loadPosts(path.resolve(__dirname, '../../raw.html'))

console.log(activeMembersPerMonth(posts))
