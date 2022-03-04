function recordTime() {
  const startTime = new Date();

  process.on('exit', () => {
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;
    console.log(`The operation took ${duration} seconds`);
  });
}

exports.recordTime = recordTime;
