const responseFormatter = require('../middleware/responseFormatter')
const errorHandler = require('../models/ErrorHandler')
const { logger } = require('./../models/logger')
const cache = require('./../models/Cache')
const http = require('axios')

module.exports = {
  getToken
}

async function getToken (req, res, next) {
  // set the cache key to be the client_id + client_secret combination
  // const key = `${req.body.client_id}:${req.body.client_secret}`
  const key = req.body.client_id
  let data = {}
  let payload = {}
  
  try {
    // try to get the token data from the REDIS cache
    data = await cache.getDataByKey({ key })
    if (!data) {
      logger.info(`cache miss! key: ${key}`)
      // if the data wasn't in the cache, then get a new token
      const response = await fetchTokenFromCIC(req.body)
      // and cache it in REDIS
      payload = response.data
      cache.setDataByKey({ key, ttl: payload.expires_in, data: payload })
      // flag the response as NOT from cache - FOR DEMO PURPOSE ONLY!
      payload.fromCache = false
    } else {
      // we will return the payload to the requestor.
      logger.info(`cache hit! key: ${key}`)
      payload = JSON.parse(data)
      // flag the response as from cache - FOR DEMO PURPOSE ONLY!
      payload.fromCache = true
    }

    res.status(200).json(payload)
  } catch (error) {
    console.log(error)
    const payload = errorHandler(error)
    const json = responseFormatter(req, res, payload)
    res.status(payload.status).json(json)
  }
}

async function fetchTokenFromCIC ({ client_id, client_secret, audience }) {
  const request = {
    method: 'post',
    url: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    data: new URLSearchParams({
      client_id,
      client_secret,
      audience,
      grant_type: 'client_credentials'
    })
  }
  const response = await http(request)
  return response
}
