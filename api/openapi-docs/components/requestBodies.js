module.exports = {
  ClientCredentials: {
    description: '',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          description: 'The client credentials used to request an accees token.',
          properties: {
            client_id: { type: 'string', description: 'The client identifier.' },
            client_secret: { type: 'string', description: 'The client secret.' },
            audience: { type: 'string', description: 'The api identifier for which you are requesting access.' }
          }
        }
      }
    }
  },
  CreateResource: {
    description: 'Create new Resource',
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Resource' },       
      },
    },
  },
  UpdateResource: {
    description: 'Update Resource Profile',
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Resource' },       
      },
    },
  }
}