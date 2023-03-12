const articleService = require('../service/article_service')

class ArticleController {
  async list(ctx, next) {
    const { offset, limit, type, aid, asc, desc } = ctx.request.query
    const result = await articleService.getArticleList(
      offset,
      limit,
      type,
      aid,
      asc,
      desc
    )
    ctx.body = result
  }

  async detail(ctx, next) {
    const articleId = ctx.params.article
    const result = await articleService.getArticleDetail(articleId)
    ctx.body = [result]
  }

  async create(ctx, next) {
    const { type, title, content, aid } = ctx.request.body
    const result = await articleService.createArticle(type, title, content, aid)
    ctx.body = result ? 'success' : 'error'
  }

  async remove(ctx, next) {
    const articleId = ctx.params.article
    const result = await articleService.removeArticle(articleId)
    ctx.body = result.affectedRows ? 'success' : 'error'
  }

  async update(ctx, next) {
    const articleId = ctx.params.article
    const { type, title, content } = ctx.request.body
    const result = await articleService.updateArticle(
      articleId,
      type,
      title,
      content
    )
    ctx.body = result.affectedRows ? 'success' : 'error'
  }
}

module.exports = new ArticleController()
