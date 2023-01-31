const management = require('./../models/management')
const errorHandler = require('./ErrorHandler')

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

  async create ({ userid }) {
    const params = {
      name: `m2m-${userid}`,
      description: `The Client Credentials for user ${userid}`,
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
        userid
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

    try {
      const data = await this.api.createClient(params)
      const payload = {
        status: 200,
        message: `Found clients.`,
        data 
      }
      return payload
    } catch (error) {
      return errorHandler(error)
    }
  }

  async listAll ({ per_page, page }, userid) {
    const params = { per_page, page }
    
    try {
      const clients = await this.api.getClients(params)
      const data = clients.filter(x => {
        const isM2M = x.app_type == 'non_interactive'
        return isM2M
      })
      const payload = {
        status: 200,
        message: `Found clients.`,
        data 
      }
      return payload
    } catch (error) {
      return errorHandler(error)
    }
  }

  async read ({ clientid }) {
    
  }

  async update () {

  }

  async delete () {

  }

  async upateGrant () {

  }
}

module.exports = M2MClient