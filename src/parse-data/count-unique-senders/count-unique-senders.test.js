const path = require('path')

const loadPosts = require('../utils/load-posts')
const countUniqueSenders = require('./count-unique-senders')

describe('countUniqueSenders', () => {
  it('Counts every unique sender name among any number of posts', () => {
    const posts = loadPosts(path.resolve(__dirname, 'count-unique-senders.html'))
    const count = countUniqueSenders(posts)
    expect(count).toEqual(4)
  })
})
