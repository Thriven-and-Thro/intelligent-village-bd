const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const adminService = require('../service/admin.service')

class AdminController {
  async login(ctx, next) {
    const { name, password } = ctx.admin
    const token = jwt.sign({ name, password }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      ...ctx.admin,
      token
    }
    console.log('授权成功', ctx.body.token)
  }

  async getAreaId(ctx, next) {
    const { area } = ctx.request.body
    const result = await adminService.getAreaId(area)
    ctx.body = result ? result : 'error'
  }
}

module.exports = new AdminController()
