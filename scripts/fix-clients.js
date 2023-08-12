const path = require('path')
require('dotenv').config({ path: path.join(__dirname, './../.env') })
const Client = require('../api/models/Client')

const management = require('./../api/models/management')

const clientAPI = new Client()
const scopes = [
  'read:users',

  'update:users',
  'update:users_app_metadata',
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
const managementAPI = management(scopes)

main()

async function main () {
  try {
    const clientsToKeep = await getClientsToKeep()
    const allM2MClients = await getAllM2MClients()
    const clientsToFix = allM2MClients.filter(x => !clientsToKeep.includes(x.client_id))
    const looseClientsExist = allM2MClients.length - clientsToKeep.length > 0

    console.log('all clients count:', allM2MClients.length)
    console.log('keeper clients count:', clientsToKeep.length)
    console.log('loose M2M clients count:', clientsToFix.length)
    console.log('loose M2M clients exist?', looseClientsExist)

    if (looseClientsExist) {
      console.log('Existing loose M2M clients by ID:')
      console.log(clientsToFix.map(x => x.client_id))

      let counter = 0
      for await (let m2mClient of clientsToFix) {
        const user_id = m2mClient.user_id
        const client = {
          client_id: m2mClient.client_id,
          tier: m2mClient.tier,
          name: m2mClient.name
        } 
  
        const response = await clientAPI.addClientToUser({ user_id }, client)
        console.log('updated', response)
        counter++
      }
      console.log(`updated ${counter} loose clients`)
    }

  } catch (error) {
    console.error(error)
  }
}

/**
 * Get a list of all M2M clients currently mapped to any user's app_metadata
 * 
 * @returns Array of m2m_client ids.
 */
async function getClientsToKeep () {
  const response = await listAllUsers({ per_page: 100, page: 0 })
  const users = response.map(x => {
      return {
        id: x.user_id,
        email: x.email, 
        m2m_clients: x.app_metadata?.m2m_clients
      }
    })
  let m2mClientIDs = []
  for (let user of users) {
    m2mClientIDs = m2mClientIDs.concat(user.m2m_clients.map(y => y.client_id))
  }
  return m2mClientIDs
}

/**
 * Get a list of all M2M clients which have client_metadata with a non-empty user_id property
 * 
 * @returns Array of m2m_client ids.
 */
async function getAllM2MClients () {
  const response = await clientAPI.listAll({ per_page: 100, page: 0})
  const clientIDs = response.data.map(x => {
    return {
      client_id: x.client_id,
      user_id: x.client_metadata.user_id,
      tier: x.client_metadata.tier,
      name: x.client_metadata.name
    }
  })
  return clientIDs
}

/**
 * Get a list of all users in the Auth0 tenant.
 * 
 * @param {Object} param Pagination parameter
 * @param {Number} param.per_page Number of entries per page
 * @param {Number} param.page The page to return
 * @returns 
 */
async function listAllUsers ({ per_page=10, page=0 }) {
  // Pagination settings.
  const params = {
    search_engine: 'v3',
    per_page,
    page
  }
  const users = await managementAPI.users.getAll(params)
  return users
}