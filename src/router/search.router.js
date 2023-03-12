const Router = require('koa-router')
const { verifyAuth } = require('../middleware/admin.middleware')

const searchRouter = new Router({ prefix: '/search' })

const { search } = require('../controller/search.controller')

searchRouter.post('/', verifyAuth, search)

module.exports = searchRouter
