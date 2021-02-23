const exec = require('@0y0/exec')
const requirePlugin = require('./requirePlugin')

function handleInput(opt) {
  const fn = requirePlugin(opt.type, 'in')
  return fn(opt)
}

function handleOutput(opt, $result) {
  const vars = { $result }
  if (opt.skip && exec(opt.skip, vars)) return
  const fn = requirePlugin(opt.type, 'out')
  return fn(opt, vars)
}

module.exports = async function runTask(opt, cb) {
  try {
    const result = await handleInput(opt.in)
    await handleOutput(opt.out, result)
    cb?.(undefined, opt, result)
  } catch (error) {
    cb?.(error, opt)
  }
}
