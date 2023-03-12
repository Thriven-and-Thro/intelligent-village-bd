const connection = require('../app/database')
const SearchService = require('./search.service')

class CommentService {
  // async getCommentList(aid, art_id, offset, limit, asc, desc) {
  //   let statement = `SELECT * FROM comment WHERE aid=? AND art_id=? `

  //   if (asc === 'true') {
  //     statement += `ORDER BY updateTime ASC limit ?,?;`
  //   } else if (desc === 'true') {
  //     statement += `ORDER BY updateTime DESC limit ?,?;`
  //   } else {
  //     statement += `ORDER BY com_id limit ?,?;`
  //   }

  //   return await SearchService.searchOpt(statement, [
  //     aid,
  //     art_id,
  //     offset,
  //     limit
  //   ])
  // }

  async createComment(content, art_id, user_id, aid) {
    const statement = `INSERT INTO comment (content, art_id, user_id,aid) VALUES (?,?,?,?);`
    const result = await connection.execute(statement, [
      content,
      art_id,
      user_id,
      aid
    ])
    return result
  }

  async removeComment(id) {
    const statement = `DELETE FROM comment WHERE com_id=?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }

  async updateComment(id, content) {
    const statement = `UPDATE comment SET content=? WHERE com_id=?;`
    const [result] = await connection.execute(statement, [content, id])
    return result
  }
}

module.exports = new CommentService()
