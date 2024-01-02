const router = require('express').Router()
const { verifyUserJWT, checkJWTScopes, checkJWTPermissions } = require('./../middleware/auth')
const admin = require('./../controllers/admin')

module.exports = router

function checkJWTUserID (req, res, next) {
  const userIDs = [ req.params.user_id ]
  const options = {
    customScopeKey: 'sub',
    failWithError: true
  }
  return checkJWTScopes(userIDs, options)(req, res, next)
}

router.route('/profile/:user_id')
  .all(verifyUserJWT)
  .all(checkJWTUserID)
  .get(
    admin.getUserProfile
  )
  .patch(
    // schemaValidator(),
    admin.updateProfile 
  )

router.route('/clients')
  .all(verifyUserJWT)
  .get(
    admin.listM2MClients
  )
  .post(
    // schemaValidator(),
    admin.createM2MClient
  )

router.route('/clients/:client_id')
  .all(verifyUserJWT)  
  .get(
    admin.getM2MClientById
  )
  .delete(
    admin.deleteM2MClientById
  )