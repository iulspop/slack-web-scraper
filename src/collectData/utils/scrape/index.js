const { parseNames } = require('./parseNames')
const { gotoChannel } = require('./gotoChannel')
const { collectPosts } = require('./collectPosts')

async function scrapeConversations(page) {
  const conversationNames = parseNames(process.env.CONVERSATION_NAMES)
  if (conversationNames.length === 0) console.log('No conversations names found. Skipping conversations scrape.')
  await scrape(page, conversationNames, 'DM')
}

async function scrapeChannels(page) {
  const channelNames = parseNames(process.env.CHANNEL_NAMES)
  if (channelNames.length === 0) console.log('No channels names found. Skipping channels scrape.')
  await scrape(page, channelNames, 'Channel')
}

async function scrape(page, names, type) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    try {
      await gotoChannel(page, type, name)
    } catch (error) {
      console.error(error.message, 'Skipping scrape.')
      continue
    }
    await collectPosts(page, { type, name })
  }
}

module.exports = { scrapeConversations, scrapeChannels }
