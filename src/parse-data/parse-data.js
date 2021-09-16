const fs = require('fs')
const path = require('path')

let dataPath = path.resolve(__dirname, '../raw.html')
let channelFeedData = fs.readFileSync(dataPath, 'utf-8')
