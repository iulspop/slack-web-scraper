# Slack Web Scraper

A web scraper that navigates to a Slack workspace and save the posts and threads of a given channel or conversation.

It uses [Puppeteer headless browser](https://puppeteer.github.io/puppeteer/) for loading and interacting with Slack. It doesn't depend on installing an app in the Slack workspace or aquiring an API key. Instead, it logins to your Slack account and uses that to access the channel or conversation.

It's helpful for saving information from a channel without needing to ask a workspace administrator to export the data.

## How to collect Slack data?

1. Run `npm install` to install the dependencies.
2. Copy the `.example.env` file in the project root folder and rename it to `.env`. Then modify following environment variables in `.env`:

- `SLACK_WORKSPACE_URL`, `SLACK_EMAIL` and `SLACK_PASSWORD` are required.

  - `SLACK_WORKSPACE_URL` must be the URL you login to the workspace not `app.slack.com`. Example: `SLACK_WORKSPACE_URL=cloud-native.slack.com`. Note environment variables are set without quotes.
  - `SLACK_EMAIL` and `SLACK_PASSWORD` are credentials used to login into the workspace.

- Either set `CHANNEL_FEED_NAME` or alernatively `CONVERSATION_NAME`. If you set both, `CONVERSATION_NAME` is ignored.

  - Set `CHANNEL_FEED_NAME` to scrape a public or private channel. It's name you see under "channels" side tab in Slack. Example: `CHANNEL_FEED_NAME=general`.
  - Set `CONVERSATION_NAME` to scrape a DM or group chat. The value is the exact name tag of the person or group chat name as is written under "Direct Messages" in Slack. Example: `CONVERSATION_NAME=Iuliu Pop (Core Grad)`

- `SCROLL_UP_TIMEOUT` is optional.

  - A timeout in seconds for when to stop scrolling up the channel history and start scraping posts. Useful when scraping channels with a long history but don't need to scrape it all. For a very active channel, it could take 60 seconds to scroll up half a year then ~20min to scrape it. Example: `SCROLL_UP_TIMEOUT=30`

3. Run `npm run collect`. You will see the browser open and start scraping data. By default the browser is configured to not run in headless mode, you can change the `options` object in `launchBrowser.js` to run the scraper in headless mode.

### Tip for collecting data with Windows Subsystem for Linux

You need to configure WSL to connect to a GUI even if the browser launches in headless mode. Use [this guide](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress) to configure WSL to connect to an X server installed on Windows. Before running the collect script, the X server must be open and WSL correctly configured to connect to it, or Puppeteer will fail to launch the browser.

## How to parse Slack data?

1. Assuming you already ran `npm run collect`, you can now run `npm run parse`. Enter the file path to the HTML file of data scraped from Slack. Once started, the parsing script will output files representating intermediary parsing steps, until it reaches the last parsing step and output `*.3-parsed-posts.json`.
