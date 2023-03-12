const connection = require('../app/database')
const md5password = require('../utils/password-handles')

class UserService {
  async getUserList(offset, limit, asc, desc) {
    let statement = `SELECT * FROM user `

    if (asc === 'true') {
      statement += `ORDER BY updateTime ASC limit ?,?;`
    } else if (desc === 'true') {
      statement += `ORDER BY updateTime DESC limit ?,?;`
    } else {
      statement += `ORDER BY user_id limit ?,?;`
    }

    const [result] = await connection.execute(statement, [offset, limit])
    return result
  }

  async createUser(name, password) {
    const statement = `INSERT INTO user (name, password) VALUES (?,?);`
    const md5Password = md5password(password)
    const result = await connection.execute(statement, [name, md5Password])
    return result
  }

  async removeUser(id) {
    const statement = `DELETE FROM user WHERE user_id=?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }

  async updateUser(id, name, password) {
    const statement = `UPDATE user SET name=?, password=? WHERE user_id=?;`
    const md5Password = md5password(password)
    const [result] = await connection.execute(statement, [
      name,
      md5Password,
      id
    ])
    return result
  }
}

module.exports = new UserService()
