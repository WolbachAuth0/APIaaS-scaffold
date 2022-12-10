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

async function list (req, res, next) {

}

async function getById (req, res, next) {
  
}

async function update (req, res, next) {
  
}