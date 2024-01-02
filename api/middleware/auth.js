const { auth, requiresAuth } = require('express-openid-connect')
const checkJWTScopes = require('express-jwt-authz')
// const checkJWTScopes = require('./checkJWTScopes')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')   

/**
 * Verify JWT issued by /token endpoint for Client Credentials
 * 
 * NOTE: This expects the token issuer to be the auth0 tenant domain.
 */ 
const verifyClientCredJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.VUE_APP_AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

/**
 * Verify JWT issued via Authorization Code Flow w/PKCE to user
 * 
 * NOTE: This expects the token issuer to be the custom domain.
 */ 
const verifyUserJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.VUE_APP_CUSTOM_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.VUE_APP_CUSTOM_DOMAIN}/`,
  algorithms: ['RS256']
})

function checkJWTPermissions (permissions) {
  const customScopeKey = 'permissions'
  const failWithError = true
  return checkJWTScopes(permissions, { customScopeKey, failWithError })
}

module.exports = {
  verifyClientCredJWT,
  verifyUserJWT,
  requiresAuth,
  checkJWTScopes,
  checkJWTPermissions
}