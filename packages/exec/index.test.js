const exec = require('./index')

describe('@0y0/exec', () => {
  const variables = {
    str: 'J',
    arr: [{ num: 1 }, { num: 2 }],
    arr2: [
      { arr: [{ num: 1.1 }, { num: 1.2 }] },
      { arr: [{ num: 2.1 }, { num: 2.2 }, { num: 2.3 }] },
      { arr: [{ num: 3.1 }] }
    ]
  }

  it('should execute the string type of code', () => {
    const actual = exec('{{`Hi, ${str}`}}', variables) // eslint-disable-line no-template-curly-in-string
    expect(actual).toEqual('Hi, J')
  })

  it('should execute the object type of code', () => {
    const code = { value: '{{`Hi, ${str}`}}' } // eslint-disable-line no-template-curly-in-string
    const expected = { value: 'Hi, J' }
    const actual = exec(code, variables)
    expect(actual).toEqual(expected)
  })

  it('should execute the array type of code', () => {
    const code = ['{{str+1}}', '{{str+2}}']
    const expected = ['J1', 'J2']
    const actual = exec(code, variables)
    expect(actual).toEqual(expected)
  })

  it('should execute the array type of code with `for/of` statement', () => {
    const forCode = 'for(item of arr)'
    const itemCode = { value: '{{item.num+item.num*2}}' }
    const code = [forCode, itemCode]
    const expected = [{ value: 3 }, { value: 6 }]
    const actual = exec(code, variables)
    expect(actual).toEqual(expected)
  })

  it('should execute the array type of code with `for` statement', () => {
    const forCode = 'for(i=0;i<arr.length-1;i++)'
    const itemCode = { value: '{{arr[i].num+arr[i].num*2}}' }
    const code = [forCode, itemCode]
    const expected = [{ value: 3 }]
    const actual = exec(code, variables)
    expect(actual).toEqual(expected)
  })

  it('should execute the compound type of code', () => {
    const objCode = { num: 1, str: 'str', code: '{{arr2[0]?.arr[0].num}}' }
    const forOfCode = 'for(item of arr2.slice(1))'
    const forCode = 'for(i=item.arr.length-1;i>=item.arr.length-2&&i>=0;i--)'
    const itemCode = { val: '{{item.arr[i].num}}', idx: '{{i}}' }
    const arr2dCode = [forOfCode, [forCode, itemCode]]
    const code = { obj: objCode, arr: arr2dCode }
    const exptObj = { num: 1, str: 'str', code: 1.1 }
    const exptArr1 = [{ val: 2.3, idx: 2 }, { val: 2.2, idx: 1 }] // prettier-ignore
    const exptArr2 = [{ val: 3.1, idx: 0 }]
    const expected = { obj: exptObj, arr: [exptArr1, exptArr2] }
    const actual = exec(code, variables)
    expect(actual).toEqual(expected)
  })

  it('should execute the code with global definition', () => {
    exec.define('add', (a, b) => a + b)
    const actual = exec('{{add(1,2)}}')
    expect(actual).toEqual(3)
  })

  it('should handle the non-code format of value', () => {
    const actual = exec('Hi, {{str}}!', variables)
    expect(actual).toEqual('Hi, {{str}}!')
  })

  it('should handle the non-string type of value', () => {
    const actual = exec(1)
    expect(actual).toEqual(1)
  })
})
