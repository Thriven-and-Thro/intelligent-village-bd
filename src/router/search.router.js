const Router = require('koa-router')

const searchRouter = new Router({ prefix: '/search' })

const { search } = require('../controller/search.controller')

searchRouter.post('/', search)

module.exports = searchRouter
