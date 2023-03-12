const articleService = require('../service/article_service')
// const typeService = require('../service/type_service')

class RecommendController {
  async list(ctx, next) {
    const articleRes = await articleService.getArticleList(
      '0',
      '5',
      'false',
      'true'
    )
    // const typeRes = await typeService.getList('5')
    ctx.body = [...articleRes, ...typeRes]
  }
}

module.exports = new RecommendController()
