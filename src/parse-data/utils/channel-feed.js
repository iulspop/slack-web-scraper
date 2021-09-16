const fs = require('fs')
const path = require('path')

function channelFeed(feedDataPath = '../../raw.html') {
  feedDataPath = path.resolve(__dirname, feedDataPath)
  return fs.readFileSync(feedDataPath, 'utf-8').split("\n")
}

module.exports = channelFeed
