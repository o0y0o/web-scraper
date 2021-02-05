const vm = require('vm')

const globalVariables = {}

function execString(code, variables) {
  const matches = /^{{(.+)}}$/.exec(code)
  if (!matches) return code
  const context = { ...globalVariables, ...variables }
  vm.runInNewContext(`$rtn=${matches[1]}`, context)
  return context.$rtn
}

function execObject(code, variables) {
  return Object.entries(code).reduce((result, [key, value]) => {
    const matches = /^(\w+)\[(\w+)=(.+)\]$/.exec(key)
    if (matches) {
      const [, arrayKey, indexKey, lengthCode] = matches
      const arrayValue = []
      const arrayLength = execString(`{{${lengthCode}}}`, variables)
      for (let i = 0; i < arrayLength; i++) {
        const itemVariables = { ...variables, [indexKey]: i }
        const itemValue = exec(value, itemVariables)
        arrayValue.push(itemValue)
      }
      result[arrayKey] = arrayValue
    } else {
      result[key] = exec(value, variables)
    }
    return result
  }, {})
}

function exec(code, variables) {
  const execFn = typeof code === 'string' ? execString : execObject
  return execFn(code, variables)
}

exec.define = function (name, value) {
  globalVariables[name] = value
}

module.exports = exec
