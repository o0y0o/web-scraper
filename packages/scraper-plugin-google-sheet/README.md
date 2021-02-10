# @0y0/scraper-plugin-google-sheet · [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/o0y0o/web-scraper/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/@0y0/scraper-plugin-google-sheet.svg)](https://www.npmjs.com/package/@0y0/scraper-plugin-google-sheet)

`@0y0/scraper-plugin-google-sheet` is a `@0y0/scraper` plugin to export data to google sheet.

# Installation

```sh
npm install --save @0y0/scraper-plugin-google-sheet
```

# Usage

```js
const plugin = require('@0y0/scraper-plugin-google-sheet')

plugin.setGoogleCredentials(
  // (object) Google Credentials: A JSON object with service account key
  credentials
)

plugin.out(
  {
    // (string) Spreadsheet ID
    spreadsheetId
    sheet: {
      // (string) Sheet title
      title,
      // (string[]) Sheet header
      header,
      // (string[][]) Sheet body
      body
    }
  },
  // (object?) Global definitions
  variables
)
```

## License

[MIT](https://github.com/o0y0o/web-scraper/blob/master/LICENSE)
