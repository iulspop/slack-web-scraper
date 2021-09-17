const channelFeed = require('../utils/channel-feed')
const filterBySender = require('./filter-by-sender')

describe('filterBySender', () => {
  it('filters by first sender in a thread/post', () => {
    const posts = channelFeed('../filter-by-sender/filter-by-sender.html')
    const filteredPosts = filterBySender(/Slackbot/, posts)
    expect(filteredPosts).toEqual([
      '<div class="container"><div class="list item"><a class="c-link c-message__sender_link">Slackbot</a></div><div class="list item"><a class="c-link c-message__sender_link">Bob</a><div></div>',
    ])
  })
})
