const searchService = require('../service/search.service')

class SearchController {
  async search(ctx, next) {
    const { table, record, aid, offset, limit, type, art_id, asc, desc } =
      ctx.request.body
    const result = await searchService.searchArticle(
      table,
      record,
      aid,
      offset,
      limit,
      type,
      art_id,
      asc,
      desc
    )
    ctx.body = result
  }

  async hot(ctx, next) {
    const { aid } = ctx.request.query
    const result = await searchService.getArticleHot(aid)
    ctx.body = result
  }

  async recommend(ctx, next) {
    const { aid } = ctx.request.query
    const result = await searchService.getArticleRecommend(aid)
    ctx.body = result
  }
}

module.exports = new SearchController()
