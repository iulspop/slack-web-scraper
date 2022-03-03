# Slack Web Scraper

## What is it?

A web scraper that navigates to a Slack workspace and save the posts and threads of a given channel feed.

It uses [Puppeteer headless browser](https://puppeteer.github.io/puppeteer/) for loading and interacting with Slack. It doesn't depend on installing an app in the Slack workspace. Instead, it logins to your Slack account and uses that to access the channel feed.

It can be helpful for saving information from a channel without needing to ask a workspace administrator to export the data.

## How to collect the data?

1. Run `npm install` to install the dependencies.
2. Configure a `.env` file in the project root folder. Four environment variables must be configured:

```
SLACK_WORKSPACE_URL=https://x.slack.com
SLACK_EMAIL=
SLACK_PASSWORD=
CHANNEL_FEED_NAME=
```

For `SLACK_WORKSPACE_URL` it must be the URL you login to the workspace with like `cloud-native.slack.com` not `app.slack.com`. The email & password is the credentials you login to the workspace with. The `CHANNEL_FEED_NAME` is the same as you see under "channels" side tab in Slack, for example: "general" or "random".

3. Run `npm run collect`. You will see the browser open and start scraping data. By default the browser is configured to not run in headless mode, you can change the `options` object in `collect-data.js` to turn on headless mode.

## How to parse the Data?

Once the scraper has reached the top of the channel and collected all the data, it will close the browser. There will be a file output called `raw.html` in the project directory.

`raw.html` contains the HTML for the posts and threads saved from the Slack channel. A post is a single post with no replies. A thread is a post and all its replies. Each post or thread is saved on one line. A post can be by a Slack Bot or user or the day divider line that marks the day.

Once the data is collected, you will need to parse the HTML. The `parse-data` folder contains scripts for parsing the HTML for a specific case. Some functions and their tests can be reused for other cases, like `countUniqueSenders`, `filterBySender`, `groupByDate`, `groupByMonth`. These can be used to manipulate the HTML data. Note that they depend on how the Slack app is implemented. If the class names for certain elements change, then the functions may not work as expected.

## How does it work?

`collect-data.js` starts the headless browser, scrapes Slack and saves the data to `raw.html`. It's configured to save each post & thread in a channel starting from the most recent, scrolling all the way up to the top of the feed until there are no more posts loaded.

## Background

This tool was developed to help moderators of a study community have a pulse on the health of a community by answering common questions like how many people are active, which courses are most popular. We did that through collecting data from the Slack channel where people organized study groups and parsing it.

## Note for WSL users

You will need configure WSL to run GUI interfaces even if the browser launches in headless mode. Use [this guide](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress) to configure an X-server for running your display from Windows. Make sure to have it open before trying to start Puppeteer or it will not work.
