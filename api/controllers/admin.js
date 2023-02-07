const responseFormatter = require('./../middleware/responseFormatter')

const User = require('./../models/User')
const Client = require('./../models/Client')

module.exports = {
  // User Endpoints
  getUserProfile,
  updateProfile,
  // Client Endpoints
  createM2MClient,
  listM2MClients,
  getM2MClientById,
  deleteM2MClientById
}

// User Endpoints
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

// Client Endpoints
async function createM2MClient (req, res, next) {
  const { user_id, tier, name } = req.body
  
  const client = new Client()
  const payload = await client.create({ user_id, tier, name })
  // respond with new client data first ...
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
  
  // then update user metadata
  const item = {
    client_id: payload.data.client_id,
    tier,
    name
  }
  await client.addClientToUser({ user_id }, item)
}

async function listM2MClients (req, res, next) {
  const user_id = req.query.user_id || req.user.sub || null
  const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10
  const page = req.query.page ? parseInt(req.query.page) : 0

  const client = new Client()
  const payload = await client.listAll({ per_page, page }, user_id)
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}

async function getM2MClientById (req, res, next) {
  const client_id = req.params.client_id || null

  const client = new Client()
  const payload = await client.read({ client_id })
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}

async function deleteM2MClientById (req, res, next) {
  const client_id = req.params.client_id
  const user_id = req.user.sub

  const client = new Client()
  const payload = await client.remove({ client_id, user_id })
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}
