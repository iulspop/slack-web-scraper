const fs = require('fs')

function writeHTMLToFile(postsHTML) {
  const filePath = './raw.html'

  fileExist(filePath)
    ? fs.appendFile(filePath, postsHTML.join('\n'), confirmWrite('appended to file!'))
    : fs.writeFile(filePath, postsHTML.join('\n'), confirmWrite('file saved!'))
}

const fileExist = filePath => {
  let fileExist
  try {
    fileExist = fs.statSync(filePath)
  } catch (error) {
    fileExist = false
  }
  return fileExist
}

const confirmWrite = msg => error => {
  if (error) throw error
  console.log(msg)
}

exports.writeHTMLToFile = writeHTMLToFile