const router = require('express').Router()
// const { verifyJWT, checkJWTScopes, checkJWTPermissions } = require('./../middleware/auth')
const admin = require('./../controllers/admin')

module.exports = router

// function checkJWTUserID (req, res, next) {
//   const customScopeKey = 'sub'
//   const failWithError = true
//   const orgIDs = [ req.params.user_id ]
//   return checkJWTScopes(orgIDs, { customScopeKey, failWithError })(req, res, next)
// }

router.route('/profile/:user_id')
  .get(
    admin.getUserProfile
  )
  .patch(
    // schemaValidator(),
    admin.updateProfile 
  )