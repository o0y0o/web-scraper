const { job } = require('cron')
const exec = require('./lib/exec')

module.exports = function runScraper(task, cb) {
  if (Array.isArray(task)) {
    task.forEach(subTask => runScraper(subTask, cb))
  } else if (task.cronTime != null) {
    job({
      start: true,
      utcOffset: 0,
      cronTime: task.cronTime,
      runOnInit: task.runCronOnInit,
      onTick: () => exec(task, cb)
    })
  } else {
    exec(task, cb)
  }
}
