const exec = require('./index')

describe('@0y0/exec', () => {
  it('should execute the string type of code', () => {
    const variables = { name: 'J' }
    const actual = exec('{{`Hi, ${name}`}}', variables) // eslint-disable-line no-template-curly-in-string
    expect(actual).toEqual('Hi, J')
  })

  it('should execute the object type of code', () => {
    const code = { current: { name: '{{`Hi, ${name}`}}', memo: 'test' } } // eslint-disable-line no-template-curly-in-string
    const variables = { name: 'J' }
    const expected = { current: { name: 'Hi, J', memo: 'test' } }
    const actual = exec(code, variables)
    expect(actual).toEqual(expected)
  })

  it('should execute the code with array value', () => {
    const itemCode = { value: '{{input[i].v+input[i].v*2}}' }
    const code = { 'output[i=input.length]': itemCode }
    const variables = { input: [{ v: 1 }, { v: 2 }] }
    const expected = { output: [{ value: 3 }, { value: 6 }] }
    const actual = exec(code, variables)
    expect(actual).toEqual(expected)
  })

  it('should execute the code with global definition', () => {
    exec.define('add', (a, b) => a + b)
    const actual = exec('{{add(1,2)}}')
    expect(actual).toEqual(3)
  })

  it('should handle the non-code format of value', () => {
    const variables = { name: 'J' }
    const actual = exec('Hi, {{name}}!', variables)
    expect(actual).toEqual('Hi, {{name}}!')
  })

  it('should handle the non-string type of value', () => {
    const actual = exec(1)
    expect(actual).toEqual(1)
  })
})
