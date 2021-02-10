const requirePlugin = require('./requirePlugin')

function handleInput(opt) {
  const fn = requirePlugin(opt.type, 'in')
  return fn(opt)
}

function handleOutput(opt, $result) {
  const fn = requirePlugin(opt.type, 'out')
  return fn(opt, { $result })
}

module.exports = async function exec(opt, cb) {
  try {
    const result = await handleInput(opt.in)
    await handleOutput(opt.out, result)
    cb?.(undefined, opt, result)
  } catch (error) {
    cb?.(error, opt)
  }
}
