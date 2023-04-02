const chartService = require('../service/chart.service')

class ChartController {
  async detail(ctx, next) {
    const { chart, aid, record } = ctx.request.body
    const result = await chartService.getChartData(chart, aid, record)
    ctx.body = result
  }
}

module.exports = new ChartController()
