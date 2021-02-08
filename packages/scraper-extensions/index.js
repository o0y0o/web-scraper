function extendExec() {
  try {
    const exec = require('@0y0/exec')
    exec.define('time', require('./lib/time'))
  } catch {}
}

extendExec()
