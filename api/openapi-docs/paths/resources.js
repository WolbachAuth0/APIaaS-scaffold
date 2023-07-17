const { content } = require('./../helpers')

module.exports = {
  '/v1/resources': {
    get: {
      // tags: [ 'Resources' ],
      summary: 'List Resources',
      description: `Find a list of resources which match the query parameters passed in the url`,
      security: [
        { Access_Token: [] }
      ],
      parameters: [
        { '$ref': '#/components/parameters/limit' },
        { '$ref': '#/components/parameters/page' },
      ],
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Paginated' }) },
        '400': { '$ref': '#/components/responses/400' },
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
      },
      // 'x-code-samples': sample.get('/resources')
    },
    post: {
      // tags: [ 'Resources' ],
      summary: 'Create Resource',
      description: `Create a new resource from the data in the request body.`,
      security: [
        { Access_Token: [] }
      ],
      parameters: [
        { '$ref': '#/components/parameters/resource_id' },
      ],
      requestBody: { '$ref': '#/components/requestBodies/CreateResource' },
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Resource' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.delete('/api/v1/resources/:resource_id')
    }
  },
  '/v1/resources/{resource_id}': {
    get: {
      // tags: [ 'Resources' ],
      summary: 'Get Resource by Id',
      description: `Fetch the resources associated to the resource id passed in the url parameter.`,
      security: [
        { Access_Token: [] }
      ],
      parameters: [
        { '$ref': '#/components/parameters/resource_id' },
      ],
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Resource' }) },
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.get('/api/v1/resources/{resource_id}')
    },
    put: {
      // tags: [ 'Resources' ],
      summary: 'Update Resource',
      description: `Update the resources associated to the resource id passed in the url parameter.`,
      security: [
        { Access_Token: [] }
      ],
      parameters: [
        { '$ref': '#/components/parameters/resource_id' },
      ],
      requestBody: { '$ref': '#/components/requestBodies/UpdateResource' },
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Resource' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.delete('/api/v1/resources/:resource_id')
    },
    patch: {
      // tags: [ 'Resources' ],
      summary: 'Update Resource',
      description: `Update the resources associated to the resource id passed in the url parameter.`,
      security: [
        { Access_Token: [] }
      ],
      parameters: [
        { '$ref': '#/components/parameters/resource_id' },
      ],
      requestBody: { '$ref': '#/components/requestBodies/UpdateResource' },
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Resource' }) },
        '400': { '$ref': '#/components/responses/400' }, // bad request
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.delete('/api/v1/resources/:resource_id')
    },
    delete: {
      // tags: [ 'Resources' ],
      summary: 'Remove Resource',
      description: `Remove the resources associated to the resource id passed in the url parameter.`,
      security: [
        { Access_Token: [] }
      ],
      parameters: [
        { '$ref': '#/components/parameters/resource_id' },
      ],
      responses: {
        '200': { description: 'OK', content: content({ '$ref': '#/components/schemas/Resource' }) },
        '401': { '$ref': '#/components/responses/401' }, // unauthorized
        '404': { '$ref': '#/components/responses/404' }, // not found
      },
      // 'x-code-samples': sample.delete('/api/v1/resources/:resource_id')
    }
  },
}