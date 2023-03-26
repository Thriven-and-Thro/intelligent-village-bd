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
  async searchArticle(
    table,
    record,
    aid,
    offset,
    limit,
    type,
    art_id,
    asc,
    desc
  ) {
    let statement = `SELECT * FROM ${table}`
    const arr = []

    // 有art_id的情况(comment)
    if (art_id) {
      statement += ' WHERE art_id=?'
      arr.push(String(art_id))
    }
    // article、feedback情况
    else {
      statement += ' WHERE aid=?'
      arr.push(String(aid))

      // 有type的情况(article)
      if (type) {
        statement += ' AND type=?'
        arr.push(String(type))
      }
    }

    // 处理时间查询
    for (const key in record) {
      if (key === 'updateTime') {
        statement += ` AND (updateTime) BETWEEN '${record[key][0]}' AND '${record[key][1]}'`
      } else {
        statement += ` AND ${key} LIKE '%${record[key]}%' `
      }
    }

    const id = `${table.slice(0, 3)}_id`

    if (asc) {
      statement += ` ORDER BY updateTime ASC`
    } else if (desc) {
      statement += ` ORDER BY updateTime DESC`
    } else {
      statement += ` ORDER BY ${id}`
    }

    // post有数字类型，get无类型，此处应该转化为字符串
    return await this.searchOpt(statement, [
      ...arr,
      String(offset),
      String(limit)
    ])
  }

  async getArticleHot(aid) {
    const statement = `SELECT comment.art_id, count(*) FROM comment
    LEFT JOIN article ON article.art_id=comment.art_id
    WHERE aid=?
    GROUP BY art_id
    ORDER BY count(*)
    DESC LIMIT 0,5;`
    const [result] = await connection.execute(statement, [aid])
    return result
  }

  async getArticleRecommend(aid) {
    const statement = `SELECT * FROM article WHERE aid=? ORDER BY updateTime DESC LIMIT 0,5;`
    const [result] = await connection.execute(statement, [aid])
    return result
  }
}

module.exports = new SearchService()
