async function gotoChannel(page, type, name) {
  let channels = await page.$$('.p-channel_sidebar__name')
  let [channelButton] = await filterByText(page, channels, name)
  if (!channelButton) {
    throw new Error(`${type} '${name}' not found. Did you make a typo in the .env file?`)
  }
  await channelButton.click()
  await channelButton.click()
}

async function filterByText(page, elementHandles, matchString) {
  const regex = new RegExp(escapeRegExp(matchString), 'i')
  const filteredElementHandles = []
  for (let i = 0; i < elementHandles.length; i++) {
    let elementHandle = elementHandles[i]
    let text = await page.evaluate(element => element.textContent, elementHandle)
    if (text.match(regex)) {
      filteredElementHandles.push(elementHandle)
    }
  }
  return filteredElementHandles
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

exports.gotoChannel = gotoChannel
