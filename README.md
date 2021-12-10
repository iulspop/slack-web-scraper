# Slack Web Scraper

## What is it?

This is a web scraper that uses Puppeteer (headless browser) to navigate to Slack and scrape data from a given channel feed.

It was originaly intended to help moderators of a study community have a pulse on the health of a community by answering common questions like how many people are active, which courses are most popular. This was achieved through collecting data from the Slack channel where people organized study groups and parsing it.

## How to use it?

The `src/` directory contains two folders: `collect-data` and `parse-data`.

### Collect Data

`collect-data.js` is a script that starts a headless browser and uses it to scrape Slack and save the data to a file. It's configured to save each post & thread in a channel starting from the most recent, scrolling all the way up to the top of the feed until there are no more posts loaded. The posts/threads are saved as raw HTML in one file.

To run the script and collect data:
1. Run `npm install` to install the dependencies.
2. Configure a `.env` file in the project root folder. Four environment variables must be configured:
```
SLACK_WORKSPACE_URL=https://x.slack.com
SLACK_EMAIL=
SLACK_PASSWORD=
COOKIES_FILE_PATH=
```
   - `COOKIES_FILE_PATH` is where the session cookies after loging in to a Slack Workspace are saved. The cookies are used to skip authentication when running the script repeatedly. The file path is relative to the working directory. The working directory is the directory from which you run the script, probably the project root.
   - The other variables are used for the headless browser to login to the Slack Workspace to collect the data.
 3. Set the `channelFeedName` to the name of the channel you want to scrape. For example `const channelFeedName = 'random-banter'.
 4. Run `node ./src/collect-data.js`. That will launch Puppeteer and it will collect the data for all the posts/threads on that channel.

 Once the script finishes. The should be a `raw.html` file saved in the working directory. It will containing the HTML for every post (single post sent by a Slack user or bot) or a thread (the post and all the replies). Each post/thread is saved on a single line.

 From here you must parse the HTML to gain the useful information and answer the questions that you want.

### Parse Data
Once the data is collected, you will need to parse the HTML. The `parse-data` folder contains scripts for parsing the HTML for a specific case. Some functions and their tests can be reused for other cases, like `countUniqueSenders`, `filterBySender`, `groupByDate`, `groupByMonth`. These can be used to manipulate the HTML data. Note that they depend on how the Slack app is implemented. If the class names for certain elements change, then the functions may not work as expected.

## Misc

 Note for WSL users: you will need configure WSL to run GUI interfaces even if the browser launches in headless mode. Use [this guide](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress) to configure an X-server for running your display from Windows. Make sure to have it open before trying to start Puppeteer or it will not work.