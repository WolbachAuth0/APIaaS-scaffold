const responseFormatter = require('./../middleware/responseFormatter')

const User = require('./../models/User')
const Client = require('./../models/Client')

module.exports = {
  getUserProfile,
  updateProfile,
  createM2MClient,
  getM2MClients,
  getM2MClientById
}

async function getUserProfile (req, res, next) {
  const id = req.params.user_id

  const user = new User({ id })
  const payload = await user.getProfile()
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}

async function updateProfile (req, res, next) {
  const id = req.params.user_id
  const body = req.body

  const user = new User({ id })
  const payload = await user.updateProfile({ body })
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}

async function createM2MClient (req, res, next) {

}

async function getM2MClients (req, res, next) {
  const user_id = req.query.user_id || null
  const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10
  const page = req.query.page ? parseInt(req.query.page) : 0

  const client = new Client()
  const payload = await client.listAll({ user_id, per_page, page })
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}

async function getM2MClientById (req, res, next) {

}

