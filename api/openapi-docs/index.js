/**
 * This module generates the documentation object from the config variables and returns it to be parsed
 * by the swagger-ui library later on in the code.
 */

// https://swagger.io/specification
const specification = {
  openapi: '3.0.3',
  info: {
    title: 'Okta | Auth0 OAuth API Example',
    description: require('./description'),
    termsOfService: `${process.env.VUE_APP_DOMAIN}/terms`,
    contact: {
      name: 'Aaron Wolbach',
      email: 'aaron.wolbach@okta.com',
      url: `${process.env.VUE_APP_DOMAIN}/support`
    },
    license: {
      name: 'UNLICENSED',
      // 'https://opensource.org/licenses/MIT'
      url: 'https://choosealicense.com/licenses/',
    },
    version: '1.0',
    'x-logo': {
      url: '../public/okta-logo-black.svg',
      altText: 'Okta'
    }
  },
  servers: [
    {
      url: `${process.env.VUE_APP_API_HOST}`,
      description: `${process.env.NODE_ENV} server`
    }
  ],
  paths: Object.assign(
    require('./paths/oauth'),
    require('./paths/resources')
  ),
  components: {
    schemas: require('./components/schemas'),
    parameters: require('./components/parameters'),
    securitySchemes: require('./components/security').schemes,
    requestBodies: require('./components/requestBodies'),
    responses: require('./components/responses'),
    // headers: {},
    // examples: {}
    // links: {},
    // callbacks: {}
  },
  // security: [{ ApiKey: [] }],
  // tags: require('./tags').tags,
  // 'x-tagGroups': require('./tags')['x-tagGroups'],
}

module.exports = specification
