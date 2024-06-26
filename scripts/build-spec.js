/*
  This script builds the OpenAPI specification from the pieces in the 'spec' folder and saves the OpenAPI spec 
  as a .json and a .yaml file.
*/


const jsonfile = require('jsonfile')
// const yaml = require('json-to-pretty-yaml')
// const fs = require('fs')
const path = require('path')

if (process.env.NODE_ENV == 'production') {
  require('dotenv').config({ path: path.join(__dirname, './../.env') })
  require('dotenv').config({ path: path.join(__dirname, './../.env.production') })
} else {
	require('dotenv').config({ path: path.join(__dirname, './../.env') })
  require('dotenv').config({ path: path.join(__dirname, './../.env.development') })
}
console.log(`Building API Specification for ${process.env.NODE_ENV} environment ...`)

const directory = path.join(__dirname, './../api/openapi-docs')

buildAPISpec(directory)

/**
 * Construct the .json and .yaml files which defind the REST API Specification. These files are essential for
 * defining and rendering the API documentation.
 * 
 * Usage
 * ```bash
 * npm run build-spec
 * ``` 
 * 
 * @param {string} directory 
 */
function buildAPISpec(directory) {
	const specification = require(directory)
	const openapiJSON = path.join(directory, 'openapi.json')
	// const openapiYAML = path.join(directory, 'openapi.yaml')

	// // write the specification document to file ... yaml
	// fs.writeFile(openapiYAML, yaml.stringify(specification), err => {
	// 	if (err) {
	// 		console.error(err)
	// 	} else {
	// 		console.log(`Open API specification was constructed successfully and saved as ${openapiYAML}`)
	// 	}
	// })

	// write the specification document to file ... json
	jsonfile
		.writeFile(openapiJSON, specification, { spaces: 2 })
		.then(response => {
			console.log(`Open API specification was constructed successfully and saved as ${openapiJSON}`)
		})
		.catch(err => {
			console.log('An error occurred while building the OpenAPI specification document.', err)
			console.log(err.stack)
		})
}