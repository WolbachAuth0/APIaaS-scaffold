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
    this._audience = process.env.VUE_APP_AUTH0_AUDIENCE
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

  // CRUD the M2M Clients
  async create ({ user_id, tier, name }) {
    const params = {
      name: `${name}`,
      description: `Client Credentials for user ${user_id}`,
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
        user_id,
        tier,
        name
      }
    }

    try {
      const client = await this.api.createClient(params)
      const grants = await this.createGrant({ client_id: client.client_id, tier })
      
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
    const startIdx = page * per_page
    const stopIdx = startIdx + per_page - 1
    try {
      let pageCount = 0
      let stillMoreClients = true
      let clients = []
      while (stillMoreClients && pageCount < 100) {
        const response = await this.api.getClients({ per_page: 100, page: pageCount, include_totals: true })
        clients.push(...response.clients)
        pageCount++
        stillMoreClients = clients.length < response.total
      }
      
      const data = clients
        .filter(x => {
          const isM2M = x.app_type == 'non_interactive'
          const clientUser = x?.client_metadata?.user_id
          return isM2M && clientUser
        })
        .filter(x => {
          if (user_id) {
            return x.client_metadata.user_id == user_id
          } else {
            return true
          }
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
        .slice(startIdx, stopIdx)
      
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

  async remove ({ client_id, user_id }) {
    try {
      const data = await this.api.deleteClient({ client_id })
      const updateUser = await this.removeClientFromUser({ client_id, user_id  })
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

  // private methods

  // CRUD the Grants
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

  // Users
  async getUserAppMetadata ({ user_id }) {
    // read the users app_metadata
    let user = await this.api.users.get({ id: user_id })

    // let app_metadata = user.app_metadata
    // const m2m_clients = app_metadata?.m2m_clients && Array.isArray(app_metadata.m2m_clients) ? app_metadata.m2m_clients : []
    // app_metadata.m2m_clients = m2m_clients
    return user.app_metadata
  }

  async addClientToUser ({ user_id, }, { client_id, tier, name }) {
    // get the user's app_metadata
    const app_metadata = await this.getUserAppMetadata({ user_id })
    // list the client_id's of the user's m2m_clients
    const userClientIDs = app_metadata.m2m_clients.map(x => x.client_id)
    
    // push the new client into the user.app_metadata.m2m_clients array ...
    if (!userClientIDs.includes(client_id)) {
      // but only if it's not a duplicate
      app_metadata.m2m_clients.push({ client_id, tier, name })
    }
    return await this.api.users.updateAppMetadata({ id: user_id }, app_metadata)
  }

  async removeClientFromUser ({ client_id, user_id }) {
    // get the user's app_metadata
    const app_metadata = await this.getUserAppMetadata({ user_id })
    // filter out the client to be removed
    app_metadata.m2m_clients = app_metadata.m2m_clients.filter(x => x.client_id !== client_id)
    // update the user app_metadata
    return await this.api.updateAppMetadata({ id: user_id }, app_metadata)
  }
}

module.exports = M2MClient