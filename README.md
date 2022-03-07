# Slack Web Scraper

## What is it?

A web scraper that navigates to a Slack workspace and save the posts and threads of a given channel feed.

It uses [Puppeteer headless browser](https://puppeteer.github.io/puppeteer/) for loading and interacting with Slack. It doesn't depend on installing an app in the Slack workspace. Instead, it logins to your Slack account and uses that to access the channel feed.

It can be helpful for saving information from a channel without needing to ask a workspace administrator to export the data.

## How to collect the data?

1. Run `npm install` to install the dependencies.
2. Configure a `.env` file in the project root folder. The following environment variables can be set:

```
SLACK_WORKSPACE_URL=https://x.slack.com
SLACK_EMAIL=
SLACK_PASSWORD=
CHANNEL_FEED_NAME=
CONVERSATION_NAME=
SCROLL_UP_TIMEOUT=
```

`SLACK_WORKSPACE_URL`, `SLACK_EMAIL` and `SLACK_PASSWORD` are required.

- `SLACK_WORKSPACE_URL` must be the URL you login to the workspace not `app.slack.com`. Example: `SLACK_WORKSPACE_URL=cloud-native.slack.com`. Note environment variables are set without quotes.
- `SLACK_EMAIL` and `SLACK_PASSWORD` are credentials used to login into the workspace.

Either set `CHANNEL_FEED_NAME` or alernatively `CONVERSATION_NAME`.

- Set `CHANNEL_FEED_NAME` to scrape a public or private channel. It's name you see under "channels" side tab in Slack. Example: `CHANNEL_FEED_NAME=general`.
- Set `CONVERSATION_NAME` to scrape a DM or group chat. The value is the exact name tag of the person or group chat name as is written under "Direct Messages" in Slack. Example: `CONVERSATION_NAME=Iuliu Pop (Core Grad)`

`SCROLL_UP_TIMEOUT` is optional.

- A timeout in seconds for when to stop scrolling up the channel history and start scraping posts. Useful when scraping channels with a long history but don't need to scrape it all. For a very active channel, it could take 30 seconds to scroll up half a year then ~20min to scrape it. Example: `SCROLL_UP_TIMEOUT=30`

3. Run `npm run collect`. You will see the browser open and start scraping data. By default the browser is configured to not run in headless mode, you can change the `options` object in `launchBrowser.js` to run the scraper in headless mode.

## How to parse the Data?

Once the scraper has reached the top of the channel and collected all the data, it will close the browser. There will be a file output called `raw.html` in the project directory.

`raw.html` contains the HTML for the posts and threads saved from the Slack channel. A post is a single post with no replies. A thread is a post and all its replies. Each post or thread is saved on one line. A post can be by a Slack Bot or user or the day divider line that marks the day.

Once the data is collected, you will need to parse the HTML. The `parse-data` folder contains scripts for parsing the HTML for a specific case. Some functions and their tests can be reused for other cases, like `countUniqueSenders`, `filterBySender`, `groupByDate`, `groupByMonth`. These can be used to manipulate the HTML data. Note that they depend on how the Slack app is implemented. If the class names for certain elements change, then the functions may not work as expected.

## Note for WSL users

You will need configure WSL to run GUI interfaces even if the browser launches in headless mode. Use [this guide](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress) to configure an X-server for running your display from Windows. Make sure to have it open before trying to start Puppeteer or it will not work.
