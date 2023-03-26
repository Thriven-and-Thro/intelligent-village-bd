const feedbackService = require('../service/feedback_service')

class FeedbackController {
  async detail(ctx, next) {
    const feedbackId = ctx.params.feedback
    const result = await feedbackService.getFeedbackDetail(feedbackId)

    ctx.body = result[0]
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
