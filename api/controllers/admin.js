const responseFormatter = require('./../middleware/responseFormatter')
const scopes = []
const management = require('./../models/management')(scopes)

module.exports = {
  getUserProfile,
  updateProfile
}

function handleError (req, res, error) {
  const payload = {
    status: parseInt(error.statusCode) || 500,
    message: error.message || 'An error occurred.',
    data: error
  }
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}

async function getUserProfile (req, res, next) {
  const id = req.params.user_id
  try {
    const data = await management.getUser({ id })
    const payload = {
      status: 200,
      message: `Found user by id: ${id}.`,
      data 
    }
    const json = responseFormatter(req, res, payload)
    res.status(payload.status).json(json)
  } catch (error) {
    handleError(req, res, error)
  }
}

async function updateProfile (req, res, next) {

}