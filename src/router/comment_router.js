const Router = require('koa-router')

const { verifyAuth } = require('../middleware/admin.middleware')
const {
  list,
  create,
  remove,
  update
} = require('../controller/comment_controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.get('/', list)
commentRouter.post('/', verifyAuth, create)
commentRouter.delete('/:comment', verifyAuth, remove)
commentRouter.patch('/:comment', verifyAuth, update)

module.exports = commentRouter
