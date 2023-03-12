const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouters = require('../router')
const errorHandler = require('./error-handle')

const app = new Koa()
app.use(bodyParser())
useRouters(app)
app.on('error', errorHandler)

module.exports = app
