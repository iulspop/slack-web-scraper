const copyObject = (object, fn = () => {}) => {
  const newObject = Object.assign({}, object)
  fn(newObject)
  return newObject
}

module.exports = copyObject
