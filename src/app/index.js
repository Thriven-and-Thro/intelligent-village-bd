const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouters = require('../router')
const errorHandler = require('./error-handle')
const pictureHandler = require('./picture-handle')

const app = new Koa()
app.use(bodyParser())

useRouters(app)
app.use(pictureHandler)

app.on('error', errorHandler)

module.exports = app
