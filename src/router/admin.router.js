const Router = require('koa-router')

const { login } = require('../controller/admin_controller')
const { verifyLogin } = require('../middleware/admin.middleware')

const adminRouter = new Router()

adminRouter.post('/login', verifyLogin, login)

module.exports = adminRouter
