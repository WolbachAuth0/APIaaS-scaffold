const { createClient } = require('redis')
const { logger } = require('./logger')

function handleError(err) {
  logger.error(err.message)
  logger.info('Something went wrong fetching data from cache.')
  return { success: false, error: err.message }
}

/**
 * The Cache class manages the connection to the REDIS database. This class
 * is optimized for deploying the application to Heroku and using a REDIS
 * Enterprise Cloud.
 * 
 * See documentation
 * 
 * https://developer.redis.com/create/heroku/herokunodejs/
 * https://github.com/redis/node-redis
 */
class Cache {
  constructor () {
    const client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
          host: process.env.REDIS_URL,
          port: process.env.REDIS_PORT
      }
    })
    this.redis = client
  }

  async connect () {
    this.redis.on('error', function (err) {
      logger.info(`Redis Client Error: ${err.message}`)
      console.error(error)
    })

    return await this.redis.connect()
  }

  /**
   * Gracefully disconnect from REDIS database.
   * 
   * @returns 
   */
  async disconnect () {
    return await this.redis.disconnect()
  }

  /**
   * Fetch data from the cache by key.
   * 
   * @param {object} parameters
   * @param {string} parameters.key 
   */
  async getDataByKey ({ key }) {
    try {
      return await this.redis.get(key)
    } catch (err) {
      return handleError(err)
    }
  }

  /**
   * Set data into the cache with a time to live.
   * 
   * @param {object} parameters
   * @param {string} parameters.key The cache key
   * @param {integer} parameters.ttl The time to live in seconds
   * @param {*} parameters.data The data to set
   */
  async setDataByKey ({ key, ttl, data }) {
    try {
      this.redis.set(key, JSON.stringify(data), { EX: ttl, NX: true })
      return { success: true, error: null }
    } catch {
      return handleError(err)
    }
  }

  /**
   * Get existing data from the cache by key. If the data is not yet present in the cache,
   * use the method (function) parameter to calculate the data. Then store that calculated
   * data into the cache for later.
   * 
   * @param {object} job
   * @param {string} job.key Cache key to retreive data with
   * @param {integer} job.ttl Time to live in seconds
   * @param {integer} job.refresh
   * @param {function} job.method The (async) function used to calculate the data.
   * @param {Array} job.parameters The parameters to pass to the calculation method
   */
  async getCacheOrCalculate({ key, ttl, refresh, method, parameters }) {
    try {
      // try to fetch the data from cache
      let data = {}
      let fromCache = await this.getDataByKey({ key })
      if (!!fromCache) {
        // if the data already exists in the cache, parse it as JSON
        logger.info(`cache hit! key = ${key}`)
        data = JSON.parse(fromCache)
      } else {
        // else, use the method (function) to calculate the new data set ...
        logger.info(`cache miss. key = ${key}`)
        data = await method.apply(null, parameters)
        // ... and store the new data in the cache.
        await this.setDataByKey({ key, ttl, data })
      }
      // return the data
      return data
    } catch (err) {
      return handleError(err)
    }
  }
}

const cache = new Cache()
module.exports = cache
