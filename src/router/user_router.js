const Router = require('koa-router')

const { verifyAuth } = require('../middleware/admin.middleware')
const {
  list,
  create,
  remove,
  update
} = require('../controller/user_controller')
const {
  pictureHander,
  pictureResize
} = require('../middleware/picture.middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.get('/', verifyAuth, list)
userRouter.post('/', verifyAuth, create)
userRouter.delete('/:user', verifyAuth, remove)
userRouter.patch('/:user', verifyAuth, update)

userRouter.post('/:user/avatar', verifyAuth, pictureHander, pictureResize)

module.exports = userRouter
