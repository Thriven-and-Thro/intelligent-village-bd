const feedbackService = require('../service/feedback_service')

class FeedbackController {
  async list(ctx, next) {
    const { aid, offset, limit } = ctx.request.query
    const result = await feedbackService.getFeedbackList(aid, offset, limit)

    ctx.body = result
  }

  async create(ctx, next) {
    const { content, user_id, aid, state, area_reply, user_reply } =
      ctx.request.body
    const result = await feedbackService.createFeedback(
      content,
      user_id,
      aid,
      state,
      area_reply,
      user_reply
    )
    ctx.body = result ? 'success' : 'error'
  }

  async remove(ctx, next) {
    const feedbackId = ctx.params.feedback
    const result = await feedbackService.removeFeedback(feedbackId)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }

  async update(ctx, next) {
    const feedbackId = ctx.params.feedback
    const { content, state, area_reply, user_reply } = ctx.request.body
    const result = await feedbackService.updateFeedback(
      feedbackId,
      content,
      state,
      area_reply,
      user_reply
    )
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new FeedbackController()
