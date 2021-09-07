const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const { clearCustomQueryHandlers } = require('puppeteer')

let dataPath = path.resolve(__dirname, '../raw.html')
let channelFeedData = fs.readFileSync(dataPath, 'utf-8')

let posts = channelFeedData.match(/(?<=(\n|^)).*(sign up here!|c-message_list__day_divider__label__pill").*(?=(\n|$))/ig)

let signups = [...weeklySignups(posts)]

console.log(signups)

// let signupsWithData = getCourseSignupReplies(signups)

function* weeklySignups(posts) {
  let thursdayIdx = null
  let thursdayDate = null
  let nextDayIdx = null

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    if (isDayElement(post)) {
      const $ = cheerio.load(post)
      const date = $('.c-message_list__day_divider__label__pill').text()

      if (date.match(/Thursday/i)) {
        thursdayIdx = i
        thursdayDate = date
      } else {
        nextDayIdx = i
        if (thursdayIdx) yield { date: thursdayDate, posts: posts.slice(thursdayIdx + 1, nextDayIdx).length }
        thursdayIdx = null
      }
    }
  }
}

function isDayElement(post) {
  return post.match('.c-message_list__day_divider__label__pill"')
}


function check(cases, callbacks, toEvaluate) {
  if ( cases.length !== callbacks.length ) { throw new Error('Cases and callbacks don\'t match in length') }

  for (let i = 0; i < cases.length; i++) {
    const kase = cases[i]
    const callback = callbacks[i]

    kase = new RegExp(kase, 'i')
    if (kase.test(toEvaluate)) {
      callback()
    }
  }
}

function courseRegexes() {
  return {
    RB101: /Ruby 101-109/i,
    JS101: /JS 101-109/i,
    RB120: /Ruby 121-129/i,
    JS120: /JS 120-129/i,
    RB130: /Ruby 130-139/i,
    JS130: /JS 130-139/i,
    LS170: /LS 170-171/i,
    RB175: /Ruby 175/i,
    JS175: /JS 175/i,
    LS180: /LS 180-181/i,
    RB185: /Ruby 185/i,
    JS185: /JS 185/i,
    JS210: /& 210-211/i,
    LS215: /& 225-229/i,
    JS230: /JS 230-239/i,
  }
}

function getCourseSignupReplies(signups) {
  signups.forEach(weeklySignup => {
    Object.keys(weeklySignup).forEach(key => {
      if (key === 'date') { return }
      const data = weeklySignup[key]
      const $ = cheerio.load(data)
      const replyCount = $('.c-message__reply_count').text()
      weeklySignup[key] = replyCount
    })
  })
  return signups
}

function weeklySignup(date) {
  return {
    date,
    RB101: '',
    JS101: '',
    RB120: '',
    JS120: '',
    RB130: '',
    JS130: '',
    LS170: '',
    RB175: '',
    JS175: '',
    LS180: '',
    RB185: '',
    JS185: '',
    JS210: '',
    LS215: '',
    JS230: ''
  }
}

function sortByDateAndCourse(courseSignupsAndDays) {
  const signups = []
  let currentDate = null
  let currentWeeklySignup = null

  courseSignupsAndDays.forEach(post => {
    if (post.match('.c-message_list__day_divider__label__pill"')) {
      const $ = cheerio.load(post)
      const date = $('.c-message_list__day_divider__label__pill').text()
      console.log(date)
      currentDate = date
    }

    if (currentDate.match(/Thursday/i)) {
      currentWeeklySignup = weeklySignup(currentDate)
      signups.push(currentWeeklySignup)

      if (post.match(/Ruby 101-109/i)) {
        currentWeeklySignup.RB101 = post
      }

      if (post.match(/Ruby 121-129/i)) {
        currentWeeklySignup.RB120 = post
      }

      if (post.match(/Ruby 130-139/i)) {
        currentWeeklySignup.RB130 = post
      }
    }
  })

  return signups
}