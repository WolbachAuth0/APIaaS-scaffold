const path = require('path')
require('dotenv').config({ path: path.join(__dirname, './../.env.test') })
const axios = require('axios')
const { defaultConfiguration } = require('../api/server')

const prodURL = `https://cic-external-api.herokuapp.com/api`
const devURL = `http://localhost:8081/api`

let config = {
  baseURL: devURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

main()

async function main () {
  try {
    const access = await getToken()
    const token = access.access_token
    console.log({
      token: token ? true : false,
      expires_in: token ? access.expires_in : undefined,
      scope: token ? access.scope : undefined
    })
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
      const list = await listResources(token)
    } else {
      console.log('No access token was retrieved.')
    }
    
  } catch (error) {
    console.log(error)
  }
}

async function getToken () {
  try {
    const body = {
      client_id: process.env.TEST_CLIENT_ID,
      client_secret: process.env.TEST_CLIENT_SECRET,
      audience: process.env.TEST_AUDIENCE
    }
    const response = await axios.post('/token', body, config)
    return response.data
  } catch (error) {
    console.log('Error while requesting access token.')
    throw error
  }
}

async function listResources (accessToken) {
  try {
    
    const response = await axios.get('/v1/resources', config)
    return response.data
  } catch (error) {
    console.log('Error while requesting access token.')
    throw error
  }
}

async function getResourceByID (accessToken) {

}

async function createNewResource (accessToken) {

}

async function updateResource (accessToken) {

}

async function deleteResource (accessToken) {

}