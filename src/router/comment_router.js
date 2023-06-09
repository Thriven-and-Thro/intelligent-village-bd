const Router = require('koa-router')

const { verifyAuth } = require('../middleware/admin.middleware')
const { create, remove, update } = require('../controller/comment_controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, create)
commentRouter.delete('/:comment', verifyAuth, remove)
commentRouter.post('/:comment', verifyAuth, update)

module.exports = commentRouter
