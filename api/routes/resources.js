const router = require('express').Router()
const { verifyJWT, checkJWTPermissions } = require('./../middleware/auth')
const schemaValidator = require('./../middleware/schemaValidator')
const resources = require('./../controllers/resources')

module.exports = router

router
  .route('/')
  .all(verifyJWT)
  .get(
    resources.list
  )
  .post(
    checkJWTPermissions(['create:resource']),
    // schemaValidator(),
    resources.create
  )

router
  .route('/:resource_id')
  .all(verifyJWT)                               // verify signature on access token
  .get(
    checkJWTPermissions(['read:resource']),     // verify access token contains necessary permission(s)
    resources.getById                           // execute the get User by Id function
  )
  .put(
    checkJWTPermissions(['update:resource']),
    // schemaValidator(),
    resources.update
  )
  .patch(
    checkJWTPermissions(['update:resource']),
    // schemaValidator(),
    resources.update
  )
  .delete(
    checkJWTPermissions(['delete:resource']),
    resources.remove
  )
  