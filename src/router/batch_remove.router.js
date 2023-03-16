const Router = require('koa-router')
const { verifyAuth } = require('../middleware/admin.middleware')

const batchRemoveRouter = new Router({ prefix: '/batchRemove' })

const { batchRemove } = require('../controller/batch_remove.controller')

batchRemoveRouter.post('/', verifyAuth, batchRemove)

module.exports = batchRemoveRouter
