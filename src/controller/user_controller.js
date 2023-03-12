const userService = require('../service/user_service')

class UserController {
  async list(ctx, next) {
    const { offset, limit, asc, desc } = ctx.request.query
    const result = await userService.getUserList(offset, limit, asc, desc)
    ctx.body = result
  }

  async create(ctx, next) {
    const { name, password } = ctx.request.body
    const result = await userService.createUser(name, password)
    ctx.body = result ? 'success' : 'error'
  }

  async remove(ctx, next) {
    const userId = ctx.params.user
    const result = await userService.removeUser(userId)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }

  async update(ctx, next) {
    const userId = ctx.params.user
    const { name, password } = ctx.request.body
    const result = await userService.updateUser(userId, name, password)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new UserController()
