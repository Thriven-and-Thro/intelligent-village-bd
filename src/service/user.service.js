const connection = require('../app/database')
const md5password = require('../utils/password-handles')

class UserService {
  async createUser(name, password) {
    const statement = `INSERT INTO user (name, password) VALUES (?,?);`
    const result = await connection.execute(statement, [
      name,
      md5password(password)
    ])
    return result
  }

  async updateUser(id, password, mail, phone) {
    const statement = `UPDATE user SET password=?, mail=?, phone=? WHERE user_id=?;`
    const [result] = await connection.execute(statement, [
      md5password(password),
      mail,
      phone,
      id
    ])
    return result
  }
}

module.exports = new UserService()
