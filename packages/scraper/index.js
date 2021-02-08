const { job } = require('cron')
const exec = require('./lib/exec')

module.exports = async function runScraper(task) {
  if (Array.isArray(task)) {
    task.forEach(runScraper)
  } else if (task.cron != null) {
    job({
      start: true,
      cronTime: task.cronTime,
      runOnInit: task.runCronOnInit,
      onTick: () => exec(task)
    })
  } else {
    exec(task)
  }
}
