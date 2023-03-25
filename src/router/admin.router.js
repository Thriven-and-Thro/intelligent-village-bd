const Router = require('koa-router')

const { login, getAreaId } = require('../controller/admin_controller')
const { verifyLogin } = require('../middleware/admin.middleware')

const adminRouter = new Router()

adminRouter.post('/login', verifyLogin, login)
adminRouter.post('/area', getAreaId)

module.exports = adminRouter
