const connection = require('../app/database')

const mapChartToLabel = ['党务', '项目', '财务', '村务']

class ChartService {
  async getBarPieChartData(aid) {
    const bar = [],
      pie = []

    // 请求反馈数量
    const feedbackState = `SELECT COUNT(*) FROM feedback WHERE aid=?`
    const [result] = await connection.execute(feedbackState, [aid])
    // 存入bar
    bar.push({
      title: '反馈',
      count: result[0]['COUNT(*)']
    })

    // 请求事务数量
    for (let i = 0; i < mapChartToLabel.length; i++) {
      const articleState = `SELECT COUNT(*) FROM article WHERE type=? AND aid=?`
      const [result] = await connection.execute(articleState, [i + 1, aid])
      // 存入bar
      bar.push({
        title: mapChartToLabel[i],
        count: result[0]['COUNT(*)']
      })

      // 存入pie
      pie.push({
        name: mapChartToLabel[i],
        value: result[0]['COUNT(*)']
      })
    }

    return [bar, pie]
  }

  async getLineChartData(aid) {
    const res = []
    for (let i = 0; i <= 2; i++) {
      const statement = `SELECT DATE_FORMAT(updateTime,'%Y-%m') AS mount,COUNT(*) FROM feedback WHERE state=? AND aid=? GROUP BY DATE_FORMAT(updateTime,'%Y-%m');`
      const [result] = await connection.execute(statement, [i, aid])

      const tmp = {}
      for (const item of result) {
        tmp[item.mount] = item['COUNT(*)']
      }
      res.push(tmp)
    }

    return res
  }

  async getChartData(chart, aid, record) {
    if (chart === 'bar' || chart === 'pie') {
      const [bar, pie] = await this.getBarPieChartData(aid)

      if (chart === 'bar') return bar
      else return pie
    } else if (chart === 'line') {
      return await this.getLineChartData(aid)
    }
  }
}

module.exports = new ChartService()
