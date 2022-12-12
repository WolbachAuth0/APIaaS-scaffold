const responseFormatter = require('./../middleware/responseFormatter')
const scopes = []
const management = require('./../models/management')(scopes)
const http = require('axios')

module.exports = {
  list,
  getById,
  update,
  schemas: {
    // updateResource: {}
    // postResource: {}
  }
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

async function list (req, res, next) {

}

async function getById (req, res, next) {
  
}

async function update (req, res, next) {
  
}