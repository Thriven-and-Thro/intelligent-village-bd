const connection = require('../app/database')

class SearchService {
  // 搜索的总条数和分页的请求封装
  async searchOpt(statement, arr) {
    // 转化为求数量
    const countSta = statement.split('*').join('COUNT(*)')
    const countASrr = arr.slice(0, -2)
    // count不能带limit
    statement += ' limit ?,?;'

    const [result1] = await connection.execute(statement, arr)
    const [result2] = await connection.execute(countSta, countASrr)
    return [{ count: result2[0]['COUNT(*)'], data: [...result1] }]
  }

  // 动态模糊查询
  async searchArticle(table, record, aid, offset, limit, asc, desc) {
    let statement = `SELECT * FROM ${table} WHERE aid=?`

    // 处理时间查询
    for (const key in record) {
      if (key === 'updateTime') {
        statement += ` AND (updateTime) BETWEEN '${record[key][0]}' AND '${record[key][1]}'`
      } else {
        statement += ` AND ${key} LIKE '%${record[key]}%' `
      }
    }

    const id = `${table.slice(0, 3)}_id`

    if (asc === 'true') {
      statement += ` ORDER BY updateTime ASC`
    } else if (desc === 'true') {
      statement += ` ORDER BY updateTime DESC`
    } else {
      statement += ` ORDER BY ${id}`
    }

    // post有数字类型，get无类型，此处应该转化为字符串
    return await this.searchOpt(statement, [
      String(aid),
      String(offset),
      String(limit)
    ])
  }
}

module.exports = new SearchService()