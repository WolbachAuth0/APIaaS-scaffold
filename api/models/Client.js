const management = require('./../models/management')

class M2MClient {
  constructor () {
    const scopes = [
      'read:users',
      
      'create:clients',
      'read:clients',
      'update:clients',
      'delete:clients',
      'read:client_keys',
      'update:client_keys',
      
      'create:client_grants',
      'read:client_grants',
      'update:client_grants',
      'delete:client_grants'
    ]
    this.api = management(scopes)
  }

  async create ({ metadata={}, userid }) {
    const body = {
      name: 'm2m-',
      description: 'The Client Credentials for user',
      logo_uri: 'https://cdn-icons-png.flaticon.com/512/2165/2165022.png',
      allowed_clients: [],
      callbacks: [],
      callback_url_template: false,
      grant_types: [ 'client_credentials' ],
      token_endpoint_auth_method: '',
      app_type: 'non_interactive',
      is_first_party: true,
      oidc_conformant: true,
      sso_disabled: false,
      cross_origin_auth: false,
      custom_login_page_on: true,
      client_metadata: {
    
      },
      refresh_token: {
        expiration_type: 'non-expiring',
        leeway: 0,
        infinite_token_lifetime: true,
        infinite_idle_token_lifetime: true,
        token_lifetime: 31557600,
        idle_token_lifetime: 2592000,
        rotation_type: 'non-rotating'
      }
    }
  }

  async read () {

  }

  async update () {

  }

  async delete () {

  }

  async upateGrant () {}
}

module.exports = M2MClient