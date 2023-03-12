const Router = require('koa-router')

const { verifyAuth } = require('../middleware/admin.middleware')
const { list, create, remove } = require('../controller/collect_controller')

const collectRouter = new Router({ prefix: '/collect' })

collectRouter.get('/', list)
collectRouter.post('/', verifyAuth, create)
collectRouter.delete('/:collect', verifyAuth, remove)

module.exports = collectRouter
