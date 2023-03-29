const fs = require('fs')
const Jimp = require('jimp')
const multer = require('@koa/multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload') //文件存储目录，注意必须存在该目录，否则报错
  },
  filename: function (req, file, cb) {
    const path = req.url.split('/').join('') + Date.now() + '.jpg'
    cb(null, path) //定义文件名
  }
})

const upload = multer({
  storage
})

const pictureHander = upload.single('avatar')

const pictureResize = async (ctx, next) => {
  const file = ctx.file
  Jimp.read(file.path).then((image) => {
    image.resize(320, Jimp.AUTO).write(`${file.path}-lg.jpg`)
    image.resize(128, Jimp.AUTO).write(`${file.path}-sm.jpg`)
  })
  ctx.request.body.avatar = file.path
  next()
}

module.exports = {
  pictureHander,
  pictureResize
}
