const { content } = require('../helpers')

module.exports = {
  '/api/v1/oauth/token': {
    post: {
      // tags: [ 'OAuth' ],
      summary: 'Access Token',
      description: 'Use this endpoint with your client credentials to request access to the other RESTful endpoints.',
      security: [
        { Access_Token: [] }
      ],
      requestBody: { '$ref': '#/components/requestBodies/ClientCredentials' },
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/AccessToken' }) },
        '400': { '$ref': '#/components/responses/400' },
        '401': { '$ref': '#/components/responses/401' },
      },
    }
  }
}