

module.exports = {
  Error: {
    type: 'object',
    description: 'When an endpoint responds with a status code other than 2XX.',
    properties: {
      message: { type: 'string', description: 'A short description of the error.', example: 'The user\'s password or email adddress was incorrect.' }
    }
  },
  AccessToken: {
    type: 'object',
    description: '',
    properties: {
      access_token: {
        type: 'string',
        description: 'An encoded JWT access token.'
      },
      expires_in: {
        type: 'number',
        description: 'An integer representing the date-time when the access token expires.'
      },
      scope: {
        type: 'string',
        description: 'A space delimited list of the permissions in the access token.'
      },
    } 
  },
  Resource: {
    type: 'object',
    description: 'A generic data resource. Replace this object with data that reflects your business use case.',
    properties: {
      
    }
  },
  Paginated: {
    type: 'object',
    description: 'A paginated list of objects.',
    properties: {
      docs: {
        type: 'array',
        description: 'List of resources matching the query.',
        items: {
          oneOf: [
            { '$ref': '#/components/schemas/Resource' }
          ]
        }
      },
      totalDocs: { type: 'integer', description: '' },
      limit: { type: 'integer', description: '' },
      totalPages: { type: 'integer', description: '' },
      page: { type: 'integer', description: '' },
      pagingCounter: { type: 'integer', description: '' },
      hasPrevPage: { type: 'boolean', description: '' },
      hasNextPage: { type: 'boolean', description: '' },
      prevPage: { type: ['integer', 'null'], description: '' },
      nextPage: { type: ['integer', 'null'], description: '' },
    }
  }
}