const fs = require('fs')

function FileUtils(filePath) {
  const replaceFilePathExtension = extension => {
    const filePathWithoutExtension = filePath.replace(/\.[^/.]+$/, '')
    return filePathWithoutExtension + extension
  }

  const writeFile = (extension, data) => {
    const newFilePath = replaceFilePathExtension(extension)
    fs.writeFileSync(newFilePath, data)
    console.log('Wrote', newFilePath)
  }

  return {
    readFile() {
      return fs.readFileSync(filePath)
    },
    saveNewFileWithExtension: extension => text => {
      writeFile(extension, text)
      return text
    },
    saveNewJSONFileWithExtension: extension => object => {
      writeFile(extension, JSON.stringify(object))
      return object
    },
  }
}

exports.FileUtils = FileUtils
