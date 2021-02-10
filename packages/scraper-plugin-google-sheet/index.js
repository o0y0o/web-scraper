const appendToSheet = require('./sheet')

let credentials

module.exports = {
  setGoogleCredentials: value => (credentials = value),
  out: (opts, vars) => {
    if (!credentials) throw new Error('Google credentials are not defined')
    return appendToSheet(credentials, opts, vars)
  }
}
