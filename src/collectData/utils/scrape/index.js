const { parseNames } = require('./parseNames')
const { gotoChannel } = require('./gotoChannel')
const { collectPosts } = require('./collectPosts')

async function scrapeConversations(page) {
  const conversationNames = parseNames(process.env.CONVERSATION_NAMES)
  await scrape(page, conversationNames, 'DM')
}

async function scrapeChannels(page) {
  const channelNames = parseNames(process.env.CHANNEL_NAMES)
  await scrape(page, channelNames, 'Channel')
}

async function scrape(page, names, type) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    await gotoChannel(page, name)
    await collectPosts(page, { type, name })
  }
}

module.exports = { scrapeConversations, scrapeChannels }
