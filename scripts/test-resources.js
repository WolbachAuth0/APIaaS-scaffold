const path = require('path')
require('dotenv').config({ path: path.join(__dirname, './../.env.test') })
const axios = require('axios')

const http = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/posts`,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
})

main()

async function main () {
  const payload = await getById({ resource_id: '2' })
  console.log(payload)
}



async function getById ({ resource_id }) {
  try {
    // TODO: handle resource not found
    const response = await http.get(`/${resource_id}`)
    const payload = {
      status: 200,
      message: `Fetched resource with id ${resource_id}`,
      data: response.data
    }
    return payload
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

async function create (body) {
  try {
    const response = await http.post(`/`, body)
    const payload = {
      status: 201,
      message: `Created resource with id ${response.data.id}`,
      data: response.data
    }
    return payload
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

async function update ({ resource_id }, body) {
  try {
    const response = await http.put(`/${resource_id}`, body)
    const payload = {
      status: 200,
      message: `Updated resource with id ${response.data.id}`,
      data: response.data
    }
    return payload
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

async function remove ({ resource_id }) {
  try {
    const response = await http.delete(`/${resource_id}`)
    const payload = {
      status: 200,
      message: `Deleted resource with id ${response.data.id}`,
      data: response.data
    }
    return payload
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}