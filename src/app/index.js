const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouters = require('../router')
const errorHandler = require('./error-handle')
const showPicture = require('./show-picture')
const cors = require('@koa/cors')

const app = new Koa()

app.use(cors())

app.use(bodyParser())

useRouters(app)

app.use(showPicture)
app.on('error', errorHandler)

module.exports = app
