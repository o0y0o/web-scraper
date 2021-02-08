# @0y0/exec-http · [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/o0y0o/web-scraper/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/@0y0/exec-http.svg)](https://www.npmjs.com/package/@0y0/exec-http)

`exec-http` runs the http request and aggregates the results.

# Installation

```sh
npm install --save @0y0/exec-http
```

# Usage

```js
const execHttp = require('@0y0/exec-http')

await execHttp(
  // (object) Http execution options
  {
    // (object) Request options
    request: {
      // (string) Request URL
      url,
      // (string?) Request method
      // (Default: GET)
      method,
      // (object?) Request headers
      headers,
      // (string?) Request body type
      // (Available: form, form-urlencoded, json)
      type,
      // (object?) Request body
      body
    },
    // (object?) Response options
    response: {
      // (string?) Response body type
      // (Available: json, text)
      type,
      // (object?) Response body model transformer
      model
    }
  },
  // (object?) Global definitions
  variables
)
```

## License

[MIT](https://github.com/o0y0o/web-scraper/blob/master/LICENSE)
