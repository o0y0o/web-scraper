function resolvePluginModule(name) {
  const matches = /^(?:@(.+)\/)?(scraper-plugin-)?(.+)$/.exec(name)
  if (matches) {
    const [, scopeName, pluginPrefix, pluginName] = matches
    switch (true) {
      case !!(pluginPrefix && pluginName):
        return name
      case !!(scopeName && !pluginPrefix && pluginName):
        return `@${scopeName}/scraper-plugin-${pluginName}`
      case !!pluginName:
        return `@0y0/scraper-plugin-${pluginName}`
    }
  }
  throw new Error(`'${name}' is not a valid plugin name`)
}

function requirePluginModule(name) {
  const moduleName = resolvePluginModule(name)
  try {
    return require(moduleName)
  } catch {
    throw new Error(`Can't resolve '${name}' plugin`)
  }
}

module.exports = function requirePlugin(name, type) {
  const plugin = requirePluginModule(name)
  if (plugin == null) throw new Error(`'${name}' is not a valid plugin`)
  const valid = typeof plugin[type] === 'function'
  if (!valid) throw new Error(`'${name}' plugin have not support '${type}'`)
  return plugin[type]
}
