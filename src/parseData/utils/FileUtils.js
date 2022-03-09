const fs = require('fs')
const jsonfile = require('jsonfile')

const { isDebugMode } = require('./isDebugMode')
const DEBUG_MODE = isDebugMode()

function FileUtils(filePath) {
  const replaceFilePathExtension = extension => {
    const filePathWithoutExtension = filePath.replace(/\.[^/.]+$/, '')
    return filePathWithoutExtension + extension
  }

  return {
    readFile() {
      return fs.readFileSync(filePath)
    },
    leaveBreadcrumb(callback, debugCallback) {
      return data => {
        DEBUG_MODE ? debugCallback(data) : callback(data)
        return data
      }
    },
    message(message) {
      return () => console.log(message)
    },
    saveNewFileWithExtension: extension => text => {
      const newFilePath = replaceFilePathExtension(extension)
      fs.writeFileSync(newFilePath, text)
      console.log('Wrote', newFilePath)
      return text
    },
    saveNewJSONFileWithExtension: extension => object => {
      const newFilePath = replaceFilePathExtension(extension)
      jsonfile.writeFileSync(newFilePath, object, { spaces: 2 })
      console.log('Wrote', newFilePath)
      return object
    },
  }
}

exports.FileUtils = FileUtils
