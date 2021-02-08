const execHttp = require('@0y0/exec-http')

module.exports = {
  in: execHttp,
  out: async (...args) => {
    const resp = await execHttp(...args)
    if (resp instanceof Error) throw resp
    const msg = `request to ${resp.url} failed, reason: ${resp.status}`
    if (resp.status !== 200) throw new Error(msg)
  }
}
