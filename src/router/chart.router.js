const Router = require('koa-router')

const chartRouter = new Router()

const { detail } = require('../controller/chart.controller')

chartRouter.post('/chart', detail)

module.exports = chartRouter
