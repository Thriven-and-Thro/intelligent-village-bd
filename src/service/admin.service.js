const connection = require('../app/database')

const loginType = {
  1: 'area',
  2: 'user'
}

class AdminService {
  async getAdminByName(type, name) {
    const statement = `SELECT * FROM ${loginType[type]} WHERE name = ?`
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }

  async getAreaId(area) {
    const statement = `SELECT * FROM area WHERE name=?`
    const [result] = await connection.execute(statement, [area])
    return result[0]
  }
}

module.exports = new AdminService()
