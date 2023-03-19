async function gotoChannel(page, type, name) {
  console.log("Waiting for channels to appear")
  await page.waitForTimeout(4000)
  console.log("Reading channel names")
  let channels = await page.$$('.p-channel_sidebar__name')
  let [channelButton] = await filterByText(page, channels, name)
  if (!channelButton) {
    throw new Error(`${type} '${name}' not found. Did you make a typo in the .env file?`)
  }
  await channelButton.click()
  await channelButton.click()
}

async function filterByText(page, elementHandles, matchString) {
  const filteredElementHandles = []
  for (let i = 0; i < elementHandles.length; i++) {
    let elementHandle = elementHandles[i]
    let text = await page.evaluate(element => element.textContent, elementHandle)
    if (text === matchString) {
      filteredElementHandles.push(elementHandle)
    }
  }
  return filteredElementHandles
}

exports.gotoChannel = gotoChannel
