const day = require('dayjs')
day.extend(require('dayjs/plugin/utc'))

function isNumber(value) {
  return typeof value === 'number'
}

function isString(value) {
  return typeof value === 'string'
}

function hasOffset(value) {
  return /(Z|[+-]\d{2}:\d{2})$/.test(value)
}

function getOffsetNumber(value) {
  if (isNumber(value)) return value

  const matches = isString(value) && /^([+-])(\d{2}):(\d{2})$/.exec(value)
  if (!matches) throw new Error('Invalid UTC offset')

  const [, sign, hour, minute] = matches
  return (sign === '+' ? 1 : -1) * (+hour * 60 + +minute)
}

module.exports = function time(value, offset) {
  const withoutOffset = isString(value) && !hasOffset(value)
  let result = withoutOffset ? day.utc(value) : day(value)

  if (offset != null) {
    const offsetNumber = getOffsetNumber(offset)
    result = result.utcOffset(offsetNumber, withoutOffset)
  }

  if (!result.isValid()) throw new Error('Invalid date')
  return result.format()
}
