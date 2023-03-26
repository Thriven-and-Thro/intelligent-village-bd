const Router = require('koa-router')

const { verifyAuth } = require('../middleware/admin.middleware')
const {
  detail,
  create,
  remove,
  update
} = require('../controller/feedback_controller')

const feedbackRouter = new Router({ prefix: '/feedback' })

feedbackRouter.get('/:feedback', detail)
feedbackRouter.post('/', verifyAuth, create)
feedbackRouter.delete('/:feedback', verifyAuth, remove)
feedbackRouter.post('/:feedback', verifyAuth, update)

module.exports = feedbackRouter
