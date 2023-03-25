const Router = require('koa-router')

const { update, create } = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/admin.middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/:user', verifyAuth, update)
userRouter.post('/', create)

module.exports = userRouter
