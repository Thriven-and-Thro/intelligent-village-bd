const connection = require('../app/database')

const articleSet = new Set(['property', 'project', 'work'])

class BatchRemoveService {
  // 动态批量删除
  async batchRemoveArticle(table, items) {
    // 对article做处理
    if (articleSet.has(table)) table = 'artcle'

    // 生成个数相同的问号
    const questions = String(new Array(items.length).fill('?'))
    let statement = `DELETE FROM ${table} WHERE ${table.slice(
      0,
      3
    )}_id in(${questions})`

    const [result] = await connection.execute(
      statement,
      items.map((v) => String(v))
    )
    return result
  }
}

module.exports = new BatchRemoveService()
