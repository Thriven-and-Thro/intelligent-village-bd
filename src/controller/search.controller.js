const searchService = require('../service/search.service')

class SearchController {
  async search(ctx, next) {
    const { table, record, aid, offset, limit, type, asc, desc } =
      ctx.request.body
    const result = await searchService.searchArticle(
      table,
      record,
      aid,
      offset,
      limit,
      type,
      asc,
      desc
    )
    ctx.body = result
  }
}

module.exports = new SearchController()
