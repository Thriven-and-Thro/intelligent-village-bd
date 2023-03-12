// 错误处理
const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_ERROR:
      status = 400 // bad request
      message = '用户名或密码错误'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401 // bad request
      message = '无效的token'
      break
    case errorTypes.UNPERMISSION:
      status = 401 // bad request
      message = '没有权限'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler
