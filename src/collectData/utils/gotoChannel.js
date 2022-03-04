async function gotoChannel(page) {
  let channelName = process.env.CHANNEL_FEED_NAME
  if (process.env.CONVERSATION_NAME) channelName = process.env.CONVERSATION_NAME

  let channels = await page.$$('.p-channel_sidebar__name')
  let [channelButton] = await filterByText(page, channels, channelName)
  await channelButton.click()
  await channelButton.click()
}

async function filterByText(page, elementHandles, textString) {
  const filteredElementHandles = []
  for (let i = 0; i < elementHandles.length; i++) {
    let elementHandle = elementHandles[i]
    let text = await page.evaluate(element => element.textContent, elementHandle)
    if (text === textString) {
      filteredElementHandles.push(elementHandle)
    }
  }
  return filteredElementHandles
}

exports.gotoChannel = gotoChannel
