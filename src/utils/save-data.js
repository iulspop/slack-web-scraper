const fs = require('fs');

function saveData(data) {
  fs.writeFile('raw.html', data, (err) => {
    if (err) { throw err }
    console.log('The file has been saved!')
  })
}

module.exports = saveData
