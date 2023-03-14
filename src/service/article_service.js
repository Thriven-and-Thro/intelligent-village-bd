const connection = require('../app/database')
const SearchService = require('./search.service')

class ArticleService {
  // async getArticleList(offset, limit, type, aid, asc, desc) {
  //   let statement = `SELECT * FROM article WHERE type=? AND aid=? `
  //   const params = [type, aid, offset, limit]

  //   if (asc === 'true') {
  //     statement += `ORDER BY updateTime ASC limit ?,?;`
  //   } else if (desc === 'true') {
  //     statement += `ORDER BY updateTime DESC limit ?,?;`
  //   } else {
  //     statement += `ORDER BY art_id limit ?,?;`
  //   }

  //   return await SearchService.searchOpt(statement, params)
  // }

  async getArticleDetail(id) {
    const statement = `SELECT * FROM article WHERE art_id=?;`
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  async createArticle(type, title, content = '', aid) {
    const statement = `INSERT INTO article (type, title, content, aid) VALUES (?,?,?,?);`
    const result = await connection.execute(statement, [
      type,
      title,
      content,
      aid
    ])
    return result
  }

  async removeArticle(id) {
    const statement = `DELETE FROM article WHERE art_id=?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }

  async updateArticle(id, type, title, content = '') {
    const statement = `UPDATE article SET type=?, title=?, content=? WHERE art_id=?;`
    const [result] = await connection.execute(statement, [
      type,
      title,
      content,
      id
    ])
    return result
  }
}

module.exports = new ArticleService()
