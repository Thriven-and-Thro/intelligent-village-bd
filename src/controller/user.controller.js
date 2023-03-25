const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    const { name, password } = ctx.request.body
    const result = await userService.createUser(name, password)
    ctx.body = result ? 'success' : 'error'
  }

  async update(ctx, next) {
    const userId = ctx.params.user
    const { password, mail, phone } = ctx.request.body
    const result = await userService.updateUser(userId, password, mail, phone)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new UserController()
