const Router = require('koa-router')

const { verifyAuth } = require('../middleware/admin.middleware')
const {
  list,
  create,
  remove,
  update
} = require('../controller/feedback_controller')

const feedbackRouter = new Router({ prefix: '/feedback' })

feedbackRouter.get('/', verifyAuth, list)
feedbackRouter.post('/', verifyAuth, create)
feedbackRouter.delete('/:feedback', verifyAuth, remove)
feedbackRouter.patch('/:feedback', verifyAuth, update)

module.exports = feedbackRouter
