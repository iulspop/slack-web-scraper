function parseNames(string) {
  if (typeof string !== 'string') return []
  if (string.length === 0) return []
  let names
  try {
    names = JSON.parse(string)
  } catch {
    console.log('Invalid JSON string provided for CONVERSATION_NAMES or CHANNEL_NAMES. Replacing with empty array.')
    names = []
  }
  return names.filter(name => typeof name === 'string')
}

function isNoConversationOrChannel() {
  return parseNames(process.env.CONVERSATION_NAMES).length === 0 && parseNames(process.env.CHANNEL_NAMES).length === 0
}

function throwErrorIfNoConversationOrChannel() {
  if (isNoConversationOrChannel()) {
    throw new Error(
      'No conversation or channel names provided. Please set the CONVERSATION_NAMES or CHANNEL_NAMES env variables.'
    )
  }
}

module.exports = { parseNames, throwErrorIfNoConversationOrChannel }
