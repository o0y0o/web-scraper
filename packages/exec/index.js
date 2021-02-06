const vm = require('vm')

const globalVars = {}

function checkVarName(name) {
  if (!/^[a-zA-Z_$][\w$]*$/.test(name))
    throw new Error(`'${name}' is not a valid variable name`)
}

function execString(code, vars) {
  const matches = /^{{(.+)}}$/.exec(code)
  if (!matches) return code
  const context = { ...globalVars, ...vars }
  vm.runInNewContext(`$rtn=${matches[1]}`, context)
  return context.$rtn
}

function execObject(code, vars) {
  return Object.entries(code).reduce((result, [key, value]) => {
    result[key] = execCode(value, vars)
    return result
  }, {})
}

function execArray(code, vars) {
  const [forCode, itemCode] = code
  const matches = /^for\((.+)\)$/.exec(forCode)
  if (!matches) return code.map(itemCode => execCode(itemCode, vars))

  const [, loopCode] = matches
  const forOfMatches = /^(.+) of (.+)$/.exec(loopCode)
  if (forOfMatches) return execForOf(forOfMatches.slice(1), itemCode, vars)
  const forMatches = /^(.+)=(.+);(.+);(.+)$/.exec(loopCode)
  if (forMatches) return execFor(forMatches.slice(1), itemCode, vars)

  throw new Error(`'${loopCode}' is not a valid loop expression`)

  function execForOf([itemName, listCode], itemCode, vars) {
    checkVarName(itemName)
    const list = execStatement(listCode, vars)
    return Array.isArray(list)
      ? list.map(item => execCode(itemCode, { ...vars, [itemName]: item }))
      : undefined
  }

  function execFor([itemName, initCode, condCode, incCode], itemCode, vars) {
    checkVarName(itemName)
    const list = []
    let item = execStatement(initCode, vars)
    while (true) {
      const itemVars = { ...vars, [itemName]: item }
      if (!execStatement(condCode, itemVars)) break
      list.push(execCode(itemCode, itemVars))
      item = execStatement(`(${incCode},${itemName})`, itemVars)
    }
    return list
  }

  function execStatement(code, vars) {
    return execString(`{{${code}}}`, vars)
  }
}

function execCode(code, vars) {
  if (typeof code === 'string') return execString(code, vars)
  if (Array.isArray(code)) return execArray(code, vars)
  if (typeof code === 'object') return execObject(code, vars)
  return code
}

function exec(code, vars) {
  for (const name in vars) checkVarName(name)
  return execCode(code, vars)
}

exec.define = function (name, value) {
  checkVarName(name)
  globalVars[name] = value
}

module.exports = exec
