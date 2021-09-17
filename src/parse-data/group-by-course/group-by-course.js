module.exports = groupByCourse

function groupByCourse(posts) {
  const courseGroups = createCourseGroups(courses)

  posts.forEach(post => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i]
      const courseRegex = courseRegexes[i]
      if (courseRegex.test(post)) { courseGroups[course].push(post) }
    }
  })

  return courseGroups
}

const createCourseGroups = courses => {
  const courseGroups = {}

  courses.forEach(course => {
    courseGroups[course] = []
  });

  return courseGroups
}

const courses = [
  'RB101',
  'JS101',
  'RB120',
  'JS120',
  'RB130',
  'JS130',
  'LS170',
  'RB175',
  'JS175',
  'LS180',
  'RB185',
  'JS185',
  'JS210',
  'LS215',
  'JS225',
  'JS230',
]

const courseRegexes = [
  /Ruby 101-109/i,
  /JS 101-109/i,
  /Ruby 121-129/i,
  /JS 120-129/i,
  /Ruby 130-139/i,
  /JS 130-139/i,
  /LS 170-171/i,
  /Ruby 175/i,
  /JS 175/i,
  /LS 180-181/i,
  /Ruby 185/i,
  /JS 185/i,
  /& 210-211/i,
  /LS 215-216/i,
  /& 225-229/i,
  /JS 230-239/i,
]
