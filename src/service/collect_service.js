const connection = require('../app/database')

const collectType = {
  1: 'art_id',
  2: 'com_id',
  3: 'fee_id'
}

class CollectService {
  async getCollectList(type, type_id) {
    let statement = `SELECT COUNT(*) AS count FROM collect WHERE ${collectType[type]}=?;`

    const [result] = await connection.execute(statement, [type_id])
    return result
  }

  async createCollect(type, user_id, type_id) {
    const statement = `INSERT INTO collect (user_id, ${collectType[type]}) VALUES (?,?);`
    const result = await connection.execute(statement, [user_id, type_id])
    return result
  }

  async removeCollect(id) {
    const statement = `DELETE FROM collect WHERE id=?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new CollectService()
