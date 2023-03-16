const connection = require('../app/database')

class CommentService {
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
