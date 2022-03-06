const fs = require('fs')

function File(filePath) {
  return {
    read() {
      return fs.readFileSync(filePath)
    },
    saveNewWithExtension: extension => data => {
      filePathWithoutExtension = filePath.replace(/\.[^/.]+$/, '')
      fs.writeFileSync(filePathWithoutExtension + extension, data)
      return data
    },
  }
}

exports.File = File
