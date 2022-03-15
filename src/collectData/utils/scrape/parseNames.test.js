const { parseNames, throwErrorIfNoConversationOrChannel } = require('./parseNames')

describe('parseNames()', () => {
  it('Parses valid JSON', () => {
    expect(parseNames('["a", "b", "c"]')).toEqual(['a', 'b', 'c'])
  })

  it("Doesn't parse invalid JSON", () => {
    expect(parseNames('["a", ]')).toEqual([])
  })

  it('Returns empty array if string is empty', () => {
    expect(parseNames('')).toEqual([])
  })

  it('Returns empty array if string is undefined', () => {
    expect(parseNames(undefined)).toEqual([])
  })

  it('Filters non strings', () => {
    expect(parseNames('["a", 10]')).toEqual(['a'])
  })

  it('Escaped double quotes are escaped', () => {
    expect(parseNames('["a\\"hello"]')).toEqual(['a"hello'])
  })
})

describe('throwErrorIfNoConversationOrChannel()', () => {
  it('If env variables unset or empty, throws error', () => {
    delete process.env.CONVERSATION_NAMES
    delete process.env.CHANNEL_FEED_NAMES

    expect(throwErrorIfNoConversationOrChannel).toThrow(Error)
  })

  it('If env variables set', () => {
    process.env.CONVERSATION_NAMES = '["a", "b", "c"]'
    process.env.CHANNEL_FEED_NAMES = '["d", "e", "f"]'

    expect(throwErrorIfNoConversationOrChannel).not.toThrow(Error)
  })
})
