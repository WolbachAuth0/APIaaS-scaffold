const { content } = require('../helpers')

const responses = {
  '200': { description: 'OK', content: content() },
  '201': { description: 'CREATED', content: content() },
  '304': { description: 'NOT MODIFIED', content: content({ '$ref': '#/components/schemas/Error' }) },
  '400': { description: 'BAD REQUEST', content: content({ '$ref': '#/components/schemas/Error' }) },
  '401': { description: 'UNAUTHORIZED', content: content({ '$ref': '#/components/schemas/Error' }) },
  '403': { description: 'FORBIDDEN', content: content({ '$ref': '#/components/schemas/Error' }) },
  '404': { description: 'NOT FOUND', content: content({ '$ref': '#/components/schemas/Error' }) },
  '409': { description: 'CONFLICT', content: content({ '$ref': '#/components/schemas/Error' })},
  '500': { description: 'SERVER ERROR', content: content({ '$ref': '#/components/schemas/Error' }) },
  '501': { description: 'NOT IMPLEMENTED', content: content({ '$ref': '#/components/schemas/Error' }) },
}

module.exports = responses
