const { isDebugMode, parseBoolean } = require('./index')

describe('isDebugMode()', () => {
  it('Correctly parse env var', () => {
    let debugMode = isDebugMode()
    process.env.DEBUG_MODE = 'TRUE'
    debugMode = isDebugMode()
    expect(debugMode).toBe(true)
  })

  it("Doesn't fail if .env is unset", () => {
    delete process.env.DEBUG_MODE
    let debugMode = isDebugMode()
    expect(debugMode).toBe(false)
  })
})

describe('parseBoolean()', () => {
  it('Correctly parse "false" string to false boolean', () => {
    let bool = parseBoolean('FALSE')
    expect(bool).toBe(false)
    bool = parseBoolean('false')
    expect(bool).toBe(false)
  })

  it('Correctly parse "true" string to true boolean', () => {
    let bool = parseBoolean('TRUE')
    expect(bool).toBe(true)
    bool = parseBoolean('true')
    expect(bool).toBe(true)
  })
})
