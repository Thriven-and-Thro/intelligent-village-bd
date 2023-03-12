const collectService = require('../service/collect_service')

class CollectController {
  async list(ctx, next) {
    const { type, type_id } = ctx.request.query
    const result = await collectService.getCollectList(type, type_id)
    ctx.body = result
  }

  async create(ctx, next) {
    const { type, user_id, type_id } = ctx.request.body
    const result = await collectService.createCollect(type, user_id, type_id)
    ctx.body = result ? 'success' : 'error'
  }

  async remove(ctx, next) {
    const collectId = ctx.params.collect
    const result = await collectService.removeCollect(collectId)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new CollectController()
