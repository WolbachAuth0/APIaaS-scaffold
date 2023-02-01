const router = require('express').Router()
const { verifyJWT, checkJWTScopes, checkJWTPermissions } = require('./../middleware/auth')
const admin = require('./../controllers/admin')

module.exports = router

function checkJWTUserID (req, res, next) {
  const customScopeKey = 'sub'
  const failWithError = true
  const orgIDs = [ req.params.user_id ]
  return checkJWTScopes(orgIDs, { customScopeKey, failWithError })(req, res, next)
}

router.route('/profile/:user_id')
  .all(verifyJWT)
  .get(
    admin.getUserProfile
  )
  .patch(
    // schemaValidator(),
    admin.updateProfile 
  )

router.route('/clients')
  .all(verifyJWT)
  // .all(checkJWTUserID)
  .get(
    admin.listM2MClients
  )
  .post(
    admin.createM2MClient
  )

router.route('/clients/:client_id')
  .all(verifyJWT)  
  .get(
    admin.getM2MClientById
  )
  .delete(
    admin.deleteM2MClientById
  )