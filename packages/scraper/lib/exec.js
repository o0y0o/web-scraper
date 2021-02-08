const requirePlugin = require('./plugins')

function handleInput(opt) {
  const fn = requirePlugin(opt.type, 'in')
  return fn(opt)
}

function handleOutput(opt, $result) {
  const fn = requirePlugin(opt.type, 'out')
  return fn(opt, { $result })
}

module.exports = async function exec(opt) {
  const result = await handleInput(opt.in)
  await handleOutput(opt.out, result)
}
