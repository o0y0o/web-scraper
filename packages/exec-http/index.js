const fetch = require('node-fetch')
const createRequest = require('./lib/createRequest')
const handleResponse = require('./lib/handleResponse')

module.exports = async function execHttp(opt, vars) {
  const req = createRequest(opt.request, vars)
  const resp = await fetch(req).catch(e => e)
  return handleResponse(opt.response, req, resp, vars)
}
