const { filterHTMLByValidElement, isValidPost, isValidThread, isValidDateDividerLine } = require('./index')
const { loadTestFile } = require('../loadTestFile')

describe('filterHTMLByValidElement()', () => {
  it('filters invalid posts', () => {
    const invalidPosts = `hey
    ho
    hi`
    expect(filterHTMLByValidElement(invalidPosts)).toBe('')
  })
})

describe('isValidPost()', () => {
  it('returns true when post valid', () => {
    const validPost = loadTestFile(__dirname, './valid-post.html')
    expect(isValidPost(validPost)).toBe(true)
  })

  it('returns false when post invalid', () => {
    const invalidPost = ''
    expect(isValidPost(invalidPost)).toBe(false)
  })

  it('returns false when post invalid', () => {
    const invalidPost = loadTestFile(__dirname, './invalid-post-1.html')
    expect(isValidPost(invalidPost)).toBe(false)
  })
})

describe('isValidThread()', () => {
  it('returns true when thread valid', () => {
    const validThread = loadTestFile(__dirname, './valid-thread.html')
    expect(isValidThread(validThread)).toBe(true)
  })

  it('returns false when thread invalid', () => {
    const invalidThread = ''
    expect(isValidThread(invalidThread)).toBe(false)
  })
})

describe('isValidDateDividerLine()', () => {
  it('returns true when day divider line valid', () => {
    const validDayDividerLine = loadTestFile(__dirname, './valid-date-divider-line.html')
    expect(isValidDateDividerLine(validDayDividerLine)).toBe(true)
  })

  it('returns false when day divider line invalid', () => {
    const invalidThread = ''
    expect(isValidDateDividerLine(invalidThread)).toBe(false)
  })
})
