const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const adminService = require('../service/admin.service')

class AdminController {
  async login(ctx, next) {
    const { aid, user_id, name, password, phone, mail } = ctx.admin
    const token = jwt.sign({ name, password }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      aid,
      user_id,
      name,
      password,
      token,
      phone,
      mail
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
