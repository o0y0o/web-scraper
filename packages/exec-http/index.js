const fetch = require('node-fetch')
const createRequest = require('./lib/request')
const handleResponse = require('./lib/response')

module.exports = async function execHttp(opt, vars) {
  const req = createRequest(opt.request, vars)
  const resp = await fetch(req).catch(e => e)
  return handleResponse(opt.response, req, resp, vars)
}
