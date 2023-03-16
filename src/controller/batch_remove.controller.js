const batchRemoveService = require('../service/batch_remove.service')

class BatchRemoveController {
  async batchRemove(ctx, next) {
    const { table, items } = ctx.request.body
    const result = await batchRemoveService.batchRemoveArticle(table, items)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new BatchRemoveController()
