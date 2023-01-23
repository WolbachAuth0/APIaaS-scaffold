
module.exports = function (error) {
  const payload = {
    status: parseInt(error.statusCode) || 500,
    message: error.message || 'An error occurred.',
    data: error
  }
  return payload
}