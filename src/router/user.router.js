const Router = require('koa-router')

const {
  update,
  create,
  detail,
  myComment,
  myFeedback,
  picture
} = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/admin.middleware')
const {
  pictureHander,
  pictureResize
} = require('../middleware/picture.middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.get('/:user', detail)
userRouter.get('/comment/:user', myComment)
userRouter.get('/feedback/:user', myFeedback)
userRouter.post('/:user', verifyAuth, update)
userRouter.post('/', create)
userRouter.post('/:user/img', verifyAuth, pictureHander, pictureResize, picture)

module.exports = userRouter
