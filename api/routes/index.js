const router = require('express').Router()
const responseFormatter = require('../middleware/responseFormatter')
const errorHandler = require('./../models/ErrorHandler')
const http = require('axios')
// const path = require('path')

module.exports = router

router
  .route('/hello')
  .get((req, res) => {
    try {
      const status = 200
      const message = 'Hello from the API server !'
      const data = {}
      const json = responseFormatter(req, res, { status, message, data })
      res.status(status).json(json)
    } catch (error) {
      console.log(error)
      const payload = errorHandler(error)
      const json = responseFormatter(req, res, payload)
      res.status(payload.status).json(json)
    }
  })

router
  .route('/token')
  .post(async (req, res, next) => {
    try {
      const request = {
        method: 'post',
        url: `https://${process.env.VUE_APP_DOMAIN}/oauth/token`,
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
      console.log(response.data)

      res.status(200).json(response.data)
    } catch (error) {
      console.log(error)
      const payload = errorHandler(error)
      const json = responseFormatter(req, res, payload)
      res.status(payload.status).json(json)
    }
  })

/**
  This endpoint has to be here to redirect invitation links to the signup screen.
  This is only relevant when using the Auth0 Organizations feature.
  
  http://localhost:8081/api/login?invitation=W6yRtawKU1wmi9vY9Y0GbjGSpEQErLvq&organization=org_poSk5O5ljabdHiKV&organization_name=okta
*/
router
  .route('/login')
  .get((req, res) => {
    const query = Object.assign(req.query, {
      response_type: 'code',
      client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
      redirect_uri: `${process.env.VUE_APP_DOMAIN}/profile`,
      response_mode: 'query'
    })
    const qs = new URLSearchParams(query).toString()
    const to = `https://${process.env.VUE_APP_CUSTOM_DOMAIN}/authorize?${qs}`
    res.redirect(to)
  })
