const isDebugMode = () => {
  return parseBoolean(process.env.DEBUG_MODE) ?? false
}

const parseBoolean = string => {
  if (typeof string !== 'string') return false
  if (string.match(/^false$/i)) return false
  if (string.match(/^true$/i)) return true
  return false
}

module.exports = { isDebugMode, parseBoolean }
