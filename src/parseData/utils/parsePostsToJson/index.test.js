const { loadTestFile } = require('../loadTestFile')
const { parsePostsToJson, parsePost, parseThread } = require('.')

describe('parsePostsToJson()', () => {
  it('Extracts posts grouped by date JSON and return JSON', () => {
    const dateGroups = JSON.parse(loadTestFile(__dirname, './date-post-thread-elements.test-group-by-date.json'))
    expect(parsePostsToJson(dateGroups)).toEqual([
      {
        timestamp: 'Mon, 08 Nov 2021 05:00:00 GMT',
        date: 'November 8th, 2021',
        posts: [
          {
            time: '4:32 PM',
            sender: 'John Doe 1',
            text: "Hi all! I'm excited to meet everyone and enjoying a break before we find out more about prep. Good luck to anyone still finishing up Core this week!",
            replies: [],
          },
          {
            time: '5:54 PM',
            sender: 'John Doe 2',
            text: 'Thanks <span dir="ltr" delay="150" data-sk="tooltip_parent"><a class="c-link c-member_slug c-member_slug--light c-member_slug--link " data-member-id="U01UN68MH2N" data-member-label="@Mary Jane" data-stringify-type="mention" data-stringify-id="U01UN68MH2N" data-stringify-label="@Mary Jane" tabindex="0" aria-hidden="false" aria-haspopup="menu" aria-expanded="false" href="https://launchschool.slack.com/team/U01UN68MH2N" rel="noopener noreferrer">@Mary Jane</a></span> for putting this together and hello to everyone! Quick question has anyone officially been accepted or are we all still waiting one that?',
            replies: [
              {
                time: '5:57 PM',
                sender: 'John Doe 1',
                text: 'Still waiting. I think we’ll get more info this week.',
                replies: [],
              },
            ],
          },
        ],
      },
    ])
  })
})

describe('parsePost()', () => {
  it('Extracts data from a post', () => {
    const post = loadTestFile(__dirname, '../filterHTMLByValidElement/valid-post.html')
    expect(parsePost(post)).toEqual({
      time: '4:32 PM',
      sender: 'John Doe',
      text: "Hi all! I'm excited to meet everyone and enjoying a break before we find out more about prep.",
      replies: [],
    })
  })
})

describe('parsePost()', () => {
  it('Extracts data from a post', () => {
    const post = loadTestFile(__dirname, '../filterHTMLByValidElement/valid-post.html')
    expect(parsePost(post)).toEqual({
      time: '4:32 PM',
      sender: 'John Doe',
      text: "Hi all! I'm excited to meet everyone and enjoying a break before we find out more about prep.",
      replies: [],
    })
  })
})

describe('parseThread()', () => {
  it('Extracts data from a thread', () => {
    const thread = loadTestFile(__dirname, '../filterHTMLByValidElement/valid-thread.html')
    expect(parseThread(thread)).toEqual({
      time: '5:54 PM',
      sender: 'John Doe',
      text: `Thanks<span><a>@John Doe</a></span>for putting this together and hello to everyone! Quick question has anyone officially been accepted or are we all still waiting one that?`,
      replies: [
        {
          time: '5:57 PM',
          sender: 'Mary Jane',
          text: "Still waiting. I think we'll get more info this week.",
          replies: [],
        },
      ],
    })
  })
})
