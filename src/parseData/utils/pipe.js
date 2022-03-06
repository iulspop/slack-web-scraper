// prettier-ignore
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

exports.pipe = pipe
