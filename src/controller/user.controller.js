const userService = require('../service/user.service')

class UserController {
  async detail(ctx, next) {
    const userId = ctx.params.user
    const result = await userService.getUserDetail(userId)
    ctx.body = result
  }

  async myComment(ctx, next) {
    const userId = ctx.params.user
    const result = await userService.getUserComment(userId)
    ctx.body = result
  }

  async myFeedback(ctx, next) {
    const userId = ctx.params.user
    const result = await userService.getUserFeedback(userId)
    ctx.body = result
  }

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

  async picture(ctx, next) {
    const userId = ctx.params.user
    const avatar = ctx.request.body.avatar.split('\\').join('/')
    const result = await userService.setPicture(avatar, userId)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new UserController()
