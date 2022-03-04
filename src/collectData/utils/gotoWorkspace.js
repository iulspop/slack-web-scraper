async function gotoWorkspace(page) {
  await page.goto(process.env.SLACK_WORKSPACE_URL)
  await page.waitForNavigation({ waitUntil: 'load' })
}

exports.gotoWorkspace = gotoWorkspace
