const fs = require('fs')
const path = require('path')

const deletePicture = (url) => {
  url = path.join(__dirname, url)
  console.log(url)
  let files = []
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url)
    files.forEach(function (file, index) {
      const curPath = path.join(url, file)
      if (fs.statSync(curPath).isDirectory()) {
        deletePicture(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(url)
  }
}

module.exports = deletePicture
