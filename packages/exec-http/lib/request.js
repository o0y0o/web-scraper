const { URLSearchParams } = require('url')
const FormData = require('form-data')
const { Request } = require('node-fetch')
const exec = require('@0y0/exec')

function getContent(type, body, vars) {
  if (type == null) return { headers: undefined, body: undefined }
  const data = exec(body, vars)
  switch (type) {
    case 'form': {
      const form = new FormData()
      Object.entries(data).forEach(entry => form.append(...entry))
      return { headers: form.getHeaders(), body: form }
    }
    case 'form-urlencoded': {
      const type = 'application/x-www-form-urlencoded;charset=utf-8'
      const headers = { 'Content-Type': type }
      return { headers, body: new URLSearchParams(Object.entries(data)) }
    }
    case 'json': {
      const headers = { 'Content-Type': 'application/json;charset=utf-8' }
      return { headers, body: JSON.stringify(data) }
    }
  }
  throw new Error(`'${type}' is not a valid request type`)
}

module.exports = function createRequest(opt, vars) {
  const url = exec(opt.url, vars)
  const headers = exec(opt.headers, vars)
  const content = getContent(opt.type, opt.body, vars)
  return new Request(url, {
    method: opt.method,
    headers: { ...headers, ...content.headers },
    body: content.body
  })
}
