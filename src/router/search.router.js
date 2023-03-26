const Router = require('koa-router')

const searchRouter = new Router()

const { search, hot, recommend } = require('../controller/search.controller')

searchRouter.post('/search', search)
searchRouter.get('/hot', hot)
searchRouter.get('/recommend', recommend)

module.exports = searchRouter
