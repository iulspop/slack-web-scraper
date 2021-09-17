const copyObject = require('./copy-object')

describe('copyObject', () => {
  it('creates object copy', () => {
    const fixture = {
      date: 'Monday, June 1st',
      posts: ['<div></div>', '<div></div>'],
    }
    const copy = copyObject(fixture)

    expect(copy).toEqual(fixture)
    expect(copy === fixture).toEqual(false)
  })

  it('mutates copy through function passed as arg', () => {
    const fixture = {
      date: 'Monday, June 1st',
      posts: ['<div></div>'],
    }
    const copy = copyObject(fixture, newGroup => {
      newGroup.courses = { RB101: [] }
      delete newGroup.posts
    })
    expect(copy).toEqual({ date: 'Monday, June 1st', courses: { RB101: [] } })
  })
})
