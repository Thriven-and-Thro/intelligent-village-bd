const connection = require('../app/database')
const SearchService = require('./search.service')

class FeedbackService {
  async getFeedbackList(aid, offset, limit, asc, desc) {
    let statement = `SELECT * FROM feedback WHERE aid=? `

    if (asc === 'true') {
      statement += `ORDER BY updateTime ASC limit ?,?;`
    } else if (desc === 'true') {
      statement += `ORDER BY updateTime DESC limit ?,?;`
    } else {
      statement += `ORDER BY fee_id limit ?,?;`
    }

    return await SearchService.searchOpt(statement, [aid, offset, limit])
  }

  async createFeedback(
    content,
    user_id,
    aid,
    state = 0,
    area_reply = '',
    user_reply = ''
  ) {
    const statement = `INSERT INTO feedback (content, user_id, aid, state, area_reply, user_reply) VALUES (?,?,?,?,?,?);`
    const result = await connection.execute(statement, [
      content,
      user_id,
      aid,
      state,
      area_reply,
      user_reply
    ])
    return result
  }

  async removeFeedback(id) {
    const statement = `DELETE FROM feedback WHERE fee_id=?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }

  async updateFeedback(id, content, state, area_reply, user_reply) {
    const statement = `UPDATE feedback SET content=?, state=?, area_reply=?, user_reply=? WHERE fee_id=?;`
    const [result] = await connection.execute(statement, [
      content,
      state,
      area_reply,
      user_reply,
      id
    ])
    return result
  }
}

module.exports = new FeedbackService()
