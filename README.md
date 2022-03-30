# Slack Web Scraper

![][slack_messages_to_parsed_posts]

A web scraper that navigates to a Slack workspace and saves the posts and threads of a given channel or DM.

It uses [Puppeteer headless browser](https://puppeteer.github.io/puppeteer/) for loading and interacting with Slack. It doesn't depend on installing an app in the Slack workspace or aquiring an API key. Instead, it logins to your Slack account and uses that to access the channel or DM.

It's helpful for saving information from a channel or DM without needing to ask a workspace administrator to export the data.

For example, if you're in the process of leaving your current company to join another, this tool is a great way to archive everything you've said and done on Slack.

## How to collect Slack data?

1. Run `npm install` to install the dependencies.
2. Copy the `.example.env` file in the project root folder and rename it to `.env`. Then modify following environment variables in `.env`:

- `SLACK_WORKSPACE_URL`, `SLACK_EMAIL` and `SLACK_PASSWORD` are required.

  - `SLACK_WORKSPACE_URL` must be the URL you login to the workspace not `app.slack.com`. Example: `SLACK_WORKSPACE_URL=cloud-native.slack.com`. Note environment variables are set without quotes.
  - `SLACK_EMAIL` and `SLACK_PASSWORD` are credentials used to login into the workspace.

- You must set one of `CONVERSATION_NAMES` or `CHANNEL_NAMES` or both.

  - The collect script will scrape the list of conversations first, then the list of channels. The list must a valid JSON array: `["element1", "element2"]`. The array elements are double quoted and the last element doesn't have a trailing comma. You can escape a double quote in a string in JSON like this: `["string\"hello"]`
  - Set `CONVERSATION_NAMES` to scrape a DM or group chat. The value is the name tag of the person or group chat name as is written under "Direct Messages" in Slack. Example: `CONVERSATION_NAMES=["Iuliu Pop (Core Grad)", "John Doe"]`.
  - Set `CHANNEL_NAMES` to scrape a public or private channels. It's the name you see under "channels" side tab in Slack. Example: `CHANNEL_NAMES=["general", "random"]`.
  - The name doesn't need to be an exact match, it must only match part of the name. For example, if a name tag includes an emoji, you can only write the part of the name tag without it and it should work.
  - The channel or the conversation must be in the list of channels or DMs in the left sidebar before running the collect script.

- `SCROLL_UP_TIMEOUT` is optional.

  - A timeout in seconds for when to stop scrolling up the channel history and start scraping posts. Useful when scraping channels with a long history but don't need to scrape it all. For a very active channel, it could take 60 seconds to scroll up half a year then ~20min to scrape it. Example: `SCROLL_UP_TIMEOUT=30`

- `HEADLESS_MODE` is optional.

  - Set to `true` to scrape with the browser in headless mode. Example: `HEADLESS_MODE=true`.
  - Helpful for scraping long channel/conversation histories, since the browser runs with a larger vertical viewport so can scrape it larger batches at a time. I recommend you start without running headless mode with one conversation or channel since you can see clearer if the collect scraper is working or not.

- `SKIP_THREADS` is optional.

  - Set to `true` to disable scraping threads on messages that are in channels or conversations. Example: `SKIP_THREADS=true`.
  - Helpful if you do not want to scrape all the replies that are made on a message but just have the main message.

3. Before starting the scrape, make sure the Slack App language is set to English. You can reset it once the scrape is finished.

4. Run `npm run collect`. You will see the browser open and start scraping data unless you set `HEADLESS_MODE` to `true`. In headless mode you will see status updates on the scraping process in the console output.

### Tip for collecting data with Windows Subsystem for Linux

You need to configure WSL to connect to a GUI even if the browser launches in headless mode. Use [this guide](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress) to configure WSL to connect to an X server installed on Windows. Before running the collect script, the X server must be open and WSL correctly configured to connect to it, or Puppeteer will fail to launch the browser.

## How to parse Slack data?

1. Assuming you already ran `npm run collect`, you can now run `npm run parse`. You will be prompted to select the file to parse from the `slack-data/` folder. Once the parsing is complete, a `slack-data/x.json` file with same name as the source HTML file will be output with the parsed posts/threads.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/iulspop"><img src="https://avatars.githubusercontent.com/u/53665722?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Iuliu Pop</b></sub></a><br /><a href="#ideas-iulspop" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/iulspop/slack-web-scraper/commits?author=iulspop" title="Code">💻</a> <a href="https://github.com/iulspop/slack-web-scraper/commits?author=iulspop" title="Documentation">📖</a> <a href="https://github.com/iulspop/slack-web-scraper/pulls?q=is%3Apr+reviewed-by%3Aiulspop" title="Reviewed Pull Requests">👀</a> <a href="#question-iulspop" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://williamdes.eu/en/"><img src="https://avatars.githubusercontent.com/u/7784660?v=4?s=100" width="100px;" alt=""/><br /><sub><b>William Desportes</b></sub></a><br /><a href="https://github.com/iulspop/slack-web-scraper/commits?author=williamdes" title="Code">💻</a> <a href="https://github.com/iulspop/slack-web-scraper/issues?q=author%3Awilliamdes" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Contributing

Very open to contributions to this project! If you have questions, bug reports or features you want to see, please open an issue. If you want to contribute code, open a pull request and I'll review ASAP.

## License

[MIT][license]

<!-- Links -->

[license]: https://github.com/iulspop/slack-web-scraper/blob/master/LICENSE.md

<!-- Demo images -->

[slack_messages_to_parsed_posts]: https://github.com/iulspop/slack-web-scraper/blob/master/docs/images/slack-messages-to-parsed-posts.jpg?raw=true
