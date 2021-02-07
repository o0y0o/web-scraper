const execHttp = require('./index')

const fakeUrl = 'http://0y0.dev/test-exec-http'
const fakeReq = { req: 'fake-req' }
const fakeResp = { resp: 'fake-resp' }

jest.mock('node-fetch', () => {
  const { URLSearchParams } = require('url')
  const FormData = require('form-data')
  const fetchMock = require('fetch-mock').sandbox()
  fetchMock
    .get(fakeUrl, fakeResp)
    .post(`${fakeUrl}/ping-pong`, (url, opt, req) => ({
      ...JSON.parse(req.body.toString('utf8')),
      type: 'pong'
    }))
    .mock((url, opt, req) => {
      if (opt.method !== 'POST') return false
      switch (url) {
        case `${fakeUrl}/post/json`:
          return req.body.toString('utf8') === JSON.stringify(fakeReq)
        case `${fakeUrl}/post/form`:
          return getFormBody(req.body) === getFormBody(toFormData(fakeReq))
        case `${fakeUrl}/post/urlencoded`:
          return req.body.toString('utf8') === toUrlSearchParams(fakeReq)
      }
      return false
    }, fakeResp)
  return fetchMock

  function getFormBody(form) {
    return form.getBuffer().toString('utf8').replaceAll(form.getBoundary(), '')
  }

  function toFormData(obj) {
    const form = new FormData()
    Object.entries(obj).forEach(entry => form.append(...entry))
    return form
  }

  function toUrlSearchParams(obj) {
    return new URLSearchParams(Object.entries(obj)).toString()
  }
})

describe('@0y0/exec-http', () => {
  it('should execute GET http request', async () => {
    const actual = await execHttp({ request: { url: fakeUrl } })
    expect(actual.status).toEqual(200)
  })

  it('should execute http request with JSON', async () => {
    const actual = await execHttp({
      request: {
        url: `${fakeUrl}/post/json`,
        method: 'POST',
        type: 'json',
        body: fakeReq
      }
    })
    expect(actual.status).toEqual(200)
  })

  it('should execute http request with form data', async () => {
    const actual = await execHttp({
      request: {
        url: `${fakeUrl}/post/form`,
        method: 'POST',
        type: 'form',
        body: fakeReq
      }
    })
    expect(actual.status).toEqual(200)
  })

  it('should execute http request with form urlencoded', async () => {
    const actual = await execHttp({
      request: {
        url: `${fakeUrl}/post/urlencoded`,
        method: 'POST',
        type: 'form-urlencoded',
        body: fakeReq
      }
    })
    expect(actual.status).toEqual(200)
  })

  it('should handle json response', async () => {
    const actual = await execHttp({
      request: { url: fakeUrl },
      response: { type: 'json' }
    })
    const expected = { status: 200, body: fakeResp }
    expect(actual).toEqual(expected)
  })

  it('should handle text response', async () => {
    const actual = await execHttp({
      request: { url: fakeUrl },
      response: { type: 'text' }
    })
    const expected = { status: 200, body: JSON.stringify(fakeResp) }
    expect(actual).toEqual(expected)
  })

  it('should handle custom response model', async () => {
    const actual = await execHttp({
      request: { url: fakeUrl },
      response: {
        type: 'json',
        model: {
          code: '{{$resp.status}}',
          data: '{{$resp.body}}',
          ref: '{{$req.url}}'
        }
      }
    })
    const expected = { code: 200, data: fakeResp, ref: fakeUrl }
    expect(actual).toEqual(expected)
  })

  it('should handle compound http request', async () => {
    const actual = await execHttp({
      variables: {
        host: fakeUrl,
        path: '/ping-pong',
        value: 1
      },
      request: {
        url: '{{host+path}}',
        method: 'POST',
        type: 'json',
        body: { value: '{{value}}' }
      },
      response: {
        type: 'json',
        model: {
          code: '{{$resp.status}}',
          value: '{{value}}',
          resp: '{{$resp.body}}'
        }
      }
    })
    expect(actual).toEqual({
      code: 200,
      value: 1,
      resp: { type: 'pong', value: 1 }
    })
  })
})
