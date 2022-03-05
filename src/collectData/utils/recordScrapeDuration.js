function recordScrapeDuration() {
  const startTime = new Date()

  process.on('exit', () => {
    const endTime = new Date()
    const duration = (endTime - startTime) / 1000
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)
    console.log(`Scraping took ${minutes} minutes and ${seconds} seconds`)
  })
}

exports.recordScrapeDuration = recordScrapeDuration
