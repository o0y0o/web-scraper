const execHttp = require('@0y0/exec-http')

module.exports = {
  in: (opt, vars) => execHttp({ ...opt, variables: vars }),
  out: (opt, vars) => execHttp({ ...opt, variables: vars })
}
