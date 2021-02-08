# @0y0/scraper · [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/o0y0o/web-scraper/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/@0y0/scraper.svg)](https://www.npmjs.com/package/@0y0/scraper)

`@0y0/scraper` is a web scraping tool that extracts any data from the web.

# Installation

```sh
npm install --save @0y0/scraper
```

# Usage

```js
const runScraper = require('@0y0/scraper')

// (object|array) Scraper options
const options = {
  // (string?) Cron time expression
  cronTime,
  // (bool?) Run cron after initialization
  // (Default: false)
  runCronOnInit,
  // (object) Input options
  in: {
    // (string) Input plugin name
    type,
    ...inputPluginOptions
  },
  // (object) Output options
  out: {
    // (string) Output plugin name
    type,
    ...outputPluginOptions
  }
}
runScraper(options)
```

## License

[MIT](https://github.com/o0y0o/web-scraper/blob/master/LICENSE)