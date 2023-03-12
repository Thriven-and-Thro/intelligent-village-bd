const jwt = require('jsonwebtoken')

const adminService = require('../service/admin.service.js')
const md5password = require('../utils/password-handles')
const { PRIVATE_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  const { type, name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  const result = await adminService.getAdminByName(type, name)
  if (!result || md5password(password) !== result?.password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.admin = result
  await next()
}

const verifyAuth = async (ctx, next) => {
  try {
    const token = ctx.request.header.authorization.replace('Bearer ', '')
    const result = jwt.verify(token, PRIVATE_KEY, {
      algorithms: ['RS256']
    })
    ctx.admin = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
