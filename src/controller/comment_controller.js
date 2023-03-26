const commentService = require('../service/comment_service')

class CommentController {
  async create(ctx, next) {
    const { content, art_id, user_id } = ctx.request.body
    const result = await commentService.createComment(content, art_id, user_id)
    ctx.body = result ? 'success' : 'error'
  }

  async remove(ctx, next) {
    const commentId = ctx.params.comment
    const result = await commentService.removeComment(commentId)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }

  async update(ctx, next) {
    const commentId = ctx.params.comment
    const { content } = ctx.request.body
    const result = await commentService.updateComment(commentId, content)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new CommentController()
