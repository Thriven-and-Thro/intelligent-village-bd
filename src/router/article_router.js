const Router = require('koa-router')
const { verifyAuth } = require('../middleware/admin.middleware')
const {
  list,
  detail,
  create,
  remove,
  update
} = require('../controller/article_controller')
const {
  pictureHander,
  pictureResize
} = require('../middleware/picture.middleware')

const articleRouter = new Router({ prefix: '/article' })

articleRouter.get('/', list)
articleRouter.get('/:article', detail)
articleRouter.post('/', verifyAuth, create)
articleRouter.delete('/:article', verifyAuth, remove)
articleRouter.post('/:article', verifyAuth, update)

module.exports = articleRouter
