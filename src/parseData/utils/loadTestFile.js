const fs = require('fs')
const path = require('path')

function loadTestFile(directoryPath, relativePath) {
  const absolutePath = path.resolve(directoryPath, relativePath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

exports.loadTestFile = loadTestFile
