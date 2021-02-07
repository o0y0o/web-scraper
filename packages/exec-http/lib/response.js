const exec = require('@0y0/exec')

function getRequest({ url, method, headers, body }) {
  return { url, method, headers, body }
}

function getResponseBody(type, resp) {
  if (type == null) return
  switch (type) {
    case 'json':
      return resp.json()
    case 'text':
      return resp.text()
  }
  throw new Error(`'${type}' is not a valid response type`)
}

async function getResponse(type, resp) {
  if (resp instanceof Error) return { status: 999, error: `${resp}` }
  const body = await getResponseBody(type, resp)
  return { status: resp.status, body }
}

module.exports = async function handleResponse(opt, req, resp, vars) {
  if (opt == null) return resp
  const $resp = await getResponse(opt.type, resp)
  if (opt.model == null) return $resp
  const $req = getRequest(req)
  return exec(opt.model, { ...vars, $req, $resp })
}
