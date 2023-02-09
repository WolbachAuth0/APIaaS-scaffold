const axios = require('axios')
const errorHandler = require('./ErrorHandler')

class Resource {

  constructor ({ resource = 'posts' }) {
    // resource options are posts, comments, albums, photos
    
    const request = {
      baseURL: `https://jsonplaceholder.typicode.com/${resource}`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      }
    }

    const http = axios.create(request)
    this.http 
  }

  static async list (query) {
    try {
      const data = this.http.get('')
      const payload = {
        status: 200,
        message: `Listed all resources`,
        data 
      }
      return payload
    } catch (error) {
      console.log(error)
      return errorHandler(error)
    }
  }

  static async getById ({ resource_id }) {
    try {
      // TODO: handle resource not found
      const data = this.http.get(`/${resource_id}`)
      const payload = {
        status: 200,
        message: `Fetched resource with id ${resource_id}`,
        data 
      }
      return payload
    } catch (error) {
      console.log(error)
      return errorHandler(error)
    }
  }

  static async create (body) {
    try {
      
    } catch (error) {
      console.log(error)
      return errorHandler(error)
    }
  }

  static async update ({ resource_id }, body) {
    try {
      
    } catch (error) {
      console.log(error)
      return errorHandler(error)
    }
  }

  static async remove ({ resource_id }) {
    try {
      
    } catch (error) {
      console.log(error)
      return errorHandler(error)
    }
  }

}

module.exports = Resource
