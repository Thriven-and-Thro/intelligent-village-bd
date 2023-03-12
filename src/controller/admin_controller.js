const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AdminController {
  async login(ctx, next) {
    const { aid, name, password } = ctx.admin
    const token = jwt.sign({ name, password }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      aid,
      name,
      password,
      token
    }
    console.log('授权成功', ctx.body.token)
  }
}

module.exports = new AdminController()
