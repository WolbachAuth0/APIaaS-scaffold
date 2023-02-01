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
    this._audience = 'https://cic-external-api.herokuapp.com/api'
  }

  get audience () { return this._audience }

  grants (tier) {
    const lookup = {
      freemium: [
        'read:resource'
      ],
      bronze: [
        'read:resource',
        'update:resource',
      ],
      silver: [
        'create:resource',
        'read:resource',
        'update:resource',
      ],
      gold: [
        'create:resource',
        'read:resource',
        'update:resource',
        'delete:resource'
      ]
    }
    return Object.keys(lookup).includes(tier) ? lookup[tier] : []
  }

  tier (grants) {
    const scopes = grants[0].scope
    if (scopes.includes('delete:resource')) {
      return 'gold'
    } else if (scopes.includes('create:resource')) {
      return 'silver'
    } else if (scopes.includes('update:resource')) {
      return 'bronze'
    } else if (scopes.includes('read:resource')) {
      return 'freemium'
    } else {
      return null
    }
  }

  async create ({ user_id, tier }) {
    const params = {
      name: `m2m-for-user-${user_id}`,
      description: `The Client Credentials for user ${user_id}`,
      logo_uri: 'https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/api-icon.png',
      allowed_clients: [],
      callbacks: [],
      grant_types: [ 'client_credentials' ],
      token_endpoint_auth_method: 'client_secret_post',
      app_type: 'non_interactive',
      is_first_party: true,
      oidc_conformant: true,
      sso_disabled: false,
      cross_origin_auth: false,
      custom_login_page_on: true,
      client_metadata: {
        user_id
      }
    }

    try {
      const client = await this.api.createClient(params)
      const grants = await this.createGrant({ client_id: client.client_id, tier })
      console.log(grants)
      const data = Object.assign(client, { grants })
      const payload = {
        status: 200,
        message: `Created new ${tier} tier M2M client for user ${user_id}`,
        data 
      }
      return payload
    } catch (error) {
      return errorHandler(error)
    }
  }

  async listAll ({ per_page, page }, user_id) {
    const params = { per_page, page }
    try {
      const clients = await this.api.getClients(params)
      const data = clients
        .filter(x => {
          const isM2M = x.app_type == 'non_interactive'
          const clientUser = x?.client_metadata?.user_id
          const isForUser = user_id && clientUser ? clientUser == user_id : false
          return isM2M && isForUser
        })
        .map(x => {
          return { 
            tenant: x.tenant,
            name: x.name,
            client_id: x.client_id,
            client_secret: x.client_secret,
            jwt_configuration: x.jwt_configuration,
            token_endpoint_auth_method: x.token_endpoint_auth_method,
            app_type: x.app_type,
            grant_types: x.grant_types,
            client_metadata: x.client_metadata
          }
        })
      const payload = {
        status: 200,
        message: `Found ${data.length} M2M clients matching query.`,
        data 
      }
      return payload
    } catch (error) {
      return errorHandler(error)
    }
  }

  async read ({ client_id }) {
    try {
      const client = await this.api.getClient({ client_id  })
      const grants = await this.api.getClientGrants({ client_id })
      const scopes = grants
        .filter(x => {
          const aud = x.audience == 'https://cic-external-api.herokuapp.com/api'
          return aud
        })
        .map(x => {
          return {
            grant_id: x.id,  
            scope: x.scope
          }
        })

      const data = Object.assign(client, { grants: scopes })
      const payload = {
        status: 200,
        message: `Found M2M Client ${client_id}`,
        data 
      }
      return payload
    } catch (error) {
      return errorHandler(error)
    }
  }

  async remove ({ client_id }) {
    try {
      const data = await this.api.deleteClient({ client_id  })
      const payload = {
        status: 200,
        message: `Deleted M2M client ${client_id}`,
        data 
      }
      return payload
    } catch (error) {
      return errorHandler(error)
    }
  }

  async createGrant ({ client_id, tier }) {
    const params = {
      client_id,
      audience: this.audience,
      scope: this.grants(tier)
    }
    const data = await this.api.clientGrants.create(params)
    return data
  }

  async upateGrant ({ grant_id, tier }) {
    
  }
}

module.exports = M2MClient