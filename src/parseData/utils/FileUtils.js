const fs = require('fs')
const jsonfile = require('jsonfile')

function FileUtils(filePath) {
  const replaceFilePathExtension = extension => {
    const filePathWithoutExtension = filePath.replace(/\.[^/.]+$/, '')
    return filePathWithoutExtension + extension
  }

  return {
    readFile() {
      return fs.readFileSync(filePath)
    },
    saveNewFileWithExtension: extension => text => {
      const newFilePath = replaceFilePathExtension(extension)
      fs.writeFile(newFilePath, text, () => console.log('Wrote', newFilePath))
      return text
    },
    saveNewJSONFileWithExtension: extension => object => {
      const newFilePath = replaceFilePathExtension(extension)
      jsonfile.writeFile(newFilePath, object, { spaces: 2 }).then(() => console.log('Wrote', newFilePath))
      return object
    },
  }
}

exports.FileUtils = FileUtils
