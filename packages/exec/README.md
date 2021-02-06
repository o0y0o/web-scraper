# @0y0/exec · [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/o0y0o/web-scraper/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/@0y0/exec.svg)](https://www.npmjs.com/package/@0y0/exec)

`exec` is a sandbox to execute code and get the return.

# Installation

```sh
npm install --save @0y0/exec
```

# Usage

```js
const exec = require('@0y0/exec')

// Run the string type of code that wrap with `{{` and `}}`
exec('{{`Hi, ${name}`}}', { name: 'JC' })
// => 'Hi, JC'

// Run the object type of code
exec({ value: '{{name}}' }, { name: 'JC' })
// => { value: 'JC' }

// Run the array type of code with for/of
exec(
  ['for(item of list)', { value: '{{item.name}}' }],
  { list: [{ name: 'JC' }] }
)
// => [{ value: 'JC' }]

// Run the array type of code with for loop
exec(
  ['for(i=0;i<list.length;i++)', { value: '{{list[i].name}}' }],
  { list: [{ name: 'JC' }] }
)
// => [{ value: 'JC' }]

// Inject global variables
const add = (a, b) => a + b
exec.define('add', add)
exec('{{add(1,2)}}')
// => 3
```

## License

[MIT](https://github.com/o0y0o/web-scraper/blob/master/LICENSE)
