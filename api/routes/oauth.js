const router = require('express').Router()
const responseFormatter = require('../middleware/responseFormatter')
const errorHandler = require('../models/ErrorHandler')
const http = require('axios')

module.exports = router

/**
 * TODO: This endpoint should implement a REDIS cache to cache the requested tokens.
 */
router
  .route('/token')
  .post(async (req, res, next) => {
    try {
      const request = {
        method: 'post',
        url: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/oauth/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        data: new URLSearchParams({
          client_id: req.body.client_id,
          client_secret: req.body.client_secret,
          audience: process.env.VUE_APP_AUTH0_AUDIENCE,
          grant_type: 'client_credentials'
        })
      }
      const response = await http(request)
      res.status(200).json(response.data)
    } catch (error) {
      console.log(error)
      const payload = errorHandler(error)
      const json = responseFormatter(req, res, payload)
      res.status(payload.status).json(json)
    }
  })
