const { isDebugMode, parseBoolean } = require('./index')

describe('isDebugMode()', () => {
  it('Parses env var', () => {
    let debugMode = isDebugMode()
    process.env.DEBUG_MODE = 'TRUE'
    debugMode = isDebugMode()
    expect(debugMode).toBe(true)
  })

  it('Return false if env var is unset', () => {
    delete process.env.DEBUG_MODE
    let debugMode = isDebugMode()
    expect(debugMode).toBe(false)
  })
})

describe('parseBoolean()', () => {
  it('Parses "false" string to false boolean', () => {
    let bool = parseBoolean('FALSE')
    expect(bool).toBe(false)
    bool = parseBoolean('false')
    expect(bool).toBe(false)
  })

  it('Parses "true" string to true boolean', () => {
    let bool = parseBoolean('TRUE')
    expect(bool).toBe(true)
    bool = parseBoolean('true')
    expect(bool).toBe(true)
  })

  it('Returns bool false if string is invalid', () => {
    let bool = parseBoolean('TRUEE')
    expect(bool).toBe(false)
  })
})
