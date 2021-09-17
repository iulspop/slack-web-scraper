const fs = require('fs')

function loadPosts(absolutePathToPostsFile) {
  return fs.readFileSync(absolutePathToPostsFile, 'utf-8').split('\n')
}

module.exports = loadPosts
