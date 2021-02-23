const runTask = require('./lib/runTask')

module.exports = function runScraper(task, cb) {
  if (Array.isArray(task)) {
    task.forEach(subTask => runScraper(subTask, cb))
  } else if (task.cronTime != null) {
    require('cron').job({
      start: true,
      utcOffset: 0,
      cronTime: task.cronTime,
      runOnInit: task.runCronOnInit,
      onTick: () => runTask(task, cb)
    })
  } else {
    runTask(task, cb)
  }
}
