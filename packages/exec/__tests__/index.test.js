const index = require('../lib/index')

describe('@0y0/exec', () => {
  it('should be success', async () => {
    expect(index).toEqual('Hello World')
  })
})
