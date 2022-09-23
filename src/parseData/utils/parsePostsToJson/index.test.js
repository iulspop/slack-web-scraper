const { loadTestFile } = require('../loadTestFile')
const { parsePostsToJson, parsePost, parseThread } = require('.')

describe('parsePostsToJson()', () => {
  it('Parses posts grouped by date', () => {
    const dateGroups = JSON.parse(loadTestFile(__dirname, './date-post-thread-elements.test-group-by-date.json'))
    expect(parsePostsToJson(dateGroups)).toEqual([
      {
        timestamp: 'Mon, 08 Nov 2021 05:00:00 GMT',
        date: 'November 8th, 2021',
        posts: [
          {
            timestamp: 'Mon, 08 Nov 2021 21:32:26 GMT',
            time: '4:32 PM',
            sender: 'John Doe 1',
            text: `<div class="p-rich_text_section">Hi all! I'm excited to meet everyone and enjoying a break before we find out more about prep. Good luck to anyone still finishing up Core this week!</div>`,
            replies: [],
            reactions: [
              {
                count: 5,
                emojiAsImage: 'https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-small/1f44b.png',
                emojiAsText: ':wave:',
              },
              {
                count: 1,
                emojiAsImage: 'https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-small/1f4aa.png',
                emojiAsText: ':muscle:',
              },
            ],
          },
          {
            timestamp: 'Mon, 08 Nov 2021 22:54:55 GMT',
            time: '5:54 PM',
            sender: 'John Doe 2',
            text: '<div class="p-rich_text_section">Thanks <span dir="ltr" delay="150" data-sk="tooltip_parent"><a class="c-link c-member_slug c-member_slug--light c-member_slug--link " data-member-id="U01UN68MH2N" data-member-label="@Mary Jane" data-stringify-type="mention" data-stringify-id="U01UN68MH2N" data-stringify-label="@Mary Jane" tabindex="0" aria-hidden="false" aria-haspopup="menu" aria-expanded="false" href="https://x.slack.com/team/U01UN68MH2N" rel="noopener noreferrer">@Mary Jane</a></span> for putting this together and hello to everyone! Quick question has anyone officially been accepted or are we all still waiting one that?</div>',
            replies: [
              {
                timestamp: 'Mon, 08 Nov 2021 22:57:44 GMT',
                time: '5:57 PM',
                sender: 'John Doe 1',
                text: '<div class="p-rich_text_section">Still waiting. I think we’ll get more info this week.</div>',
                replies: [],
                reactions: [
                  {
                    count: 1,
                    emojiAsImage:
                      'https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-small/1f44d-1f3fc.png',
                    emojiAsText: ':+1::skin-tone-3:',
                  },
                ],
              },
            ],
            reactions: [],
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
      timestamp: 'Mon, 08 Nov 2021 21:32:26 GMT',
      time: '4:32 PM',
      sender: 'John Doe',
      text: `<div class="p-rich_text_section">Hi all! I'm excited to meet everyone and enjoying a break before we find out more about prep.</div>`,
      replies: [],
      reactions: [
        {
          count: 5,
          emojiAsImage: 'x.com',
          emojiAsText: ':wave:',
        },
        {
          count: 1,
          emojiAsImage: 'x.com',
          emojiAsText: ':muscle:',
        },
      ],
    })
  })
})

describe('parseThread()', () => {
  it('Extracts data from a thread', () => {
    const thread = loadTestFile(__dirname, '../filterHTMLByValidElement/valid-thread.html')
    expect(parseThread(thread)).toEqual({
      timestamp: 'Mon, 08 Nov 2021 22:54:55 GMT',
      time: '5:54 PM',
      sender: 'John Doe',
      text: `<div class="p-rich_text_section">Thanks<span><a>@John Doe</a></span>for putting this together and hello to everyone! Quick question has anyone officially been accepted or are we all still waiting one that?</div>`,
      replies: [
        {
          timestamp: 'Mon, 08 Nov 2021 22:57:44 GMT',
          time: '5:57 PM',
          sender: 'Mary Jane',
          text: `<div class="p-rich_text_section">Still waiting. I think we'll get more info this week.</div>`,
          replies: [],
          reactions: [
            {
              count: 1,
              emojiAsImage: 'x.com',
              emojiAsText: ':+1::skin-tone-3:',
            },
          ],
        },
      ],
      reactions: [],
    })
  })
})
