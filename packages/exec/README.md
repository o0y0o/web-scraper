# @0y0/exec · [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/o0y0o/web-scraper/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/@0y0/exec.svg)](https://www.npmjs.com/package/@0y0/exec)

`exec` is a sandbox to execute code and get the return.

# Installation

```sh
npm install --save @0y0/exec
```

# Usage

```js
const exec = require('@0y0/exec')
```

### 1. Run the string type of code wrapped with `{{` and `}}`.
```js
exec('{{`Hi, ${name}`}}', { name: 'JC' })
// 'Hi, JC'
```

### 2. Run the object type of code
``` js
exec({ value: '{{name}}' }, { name: 'JC' })
// { value: 'JC' }
```

### 3. Run the array type of code
``` js
exec(['{{name}}'], { name: 'JC' })
// ['JC']
```

### 4. Run the array type of code with `for/of`
```js
exec(
  ['for(item of list)', { value: '{{item.name}}' }],
  { list: [{ name: 'JC' }] }
)
// [{ value: 'JC' }]
```

### 5. Run the array type of code with `for`
```js
exec(
  ['for(i=0;i<list.length;i++)', { value: '{{list[i].name}}' }],
  { list: [{ name: 'JC' }] }
)
// [{ value: 'JC' }]
```

### 6. Use global variables
```js
exec.define('add', (a, b) => a + b)
exec('{{add(1,2)}}')
// 3
```

## License

[MIT](https://github.com/o0y0o/web-scraper/blob/master/LICENSE)
