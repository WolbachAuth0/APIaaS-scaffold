const router = require('express').Router()
const controller = require('./../controllers/oauth')

module.exports = router

/**
 * TODO: This endpoint should implement a REDIS cache to cache the requested tokens.
 */
router
  .route('/token')
  .post(
    controller.getToken
  )
