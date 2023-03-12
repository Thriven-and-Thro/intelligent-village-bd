const Router = require('koa-router')

const { list } = require('../controller/recommend.controller')

const recommendRouter = new Router({ prefix: '/recommend' })

recommendRouter.get('/', list)

module.exports = recommendRouter
