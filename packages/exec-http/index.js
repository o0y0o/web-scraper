const fetch = require('node-fetch')
const createRequest = require('./lib/request')
const handleResponse = require('./lib/response')

module.exports = async function execHttp(opt) {
  const req = createRequest(opt.request, opt.variables)
  const resp = await fetch(req).catch(e => e)
  return handleResponse(opt.response, req, resp, opt.variables)
}
