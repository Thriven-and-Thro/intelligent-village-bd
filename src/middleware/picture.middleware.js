const path = require('path')
const Jimp = require('jimp')
const Multer = require('koa-multer')

const { PICTURE_PATH } = require('../constants/file-path')
const deletePicture = require('../../uploads/deletePicture-handle')

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PICTURE_PATH)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.slice(0, -path.extname(file.originalname).length)
    )
  }
})
const upload = Multer({
  storage
})

const pictureHander = upload.single('picture')

const pictureResize = async (ctx, next) => {
  const id = ctx.params.article
  const file = ctx.req.file
  const destPath = path.join(file.destination, id, file.filename)
  Jimp.read(file.path).then((image) => {
    image.resize(1280, Jimp.AUTO).write(`${destPath}-large.png`)
    image.resize(640, Jimp.AUTO).write(`${destPath}-middle.png`)
    image.resize(320, Jimp.AUTO).write(`${destPath}-small.png`)
  })
}

module.exports = {
  pictureHander,
  pictureResize
}
