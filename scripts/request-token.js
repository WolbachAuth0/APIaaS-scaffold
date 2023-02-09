const path = require('path')
require('dotenv').config({ path: path.join(__dirname, './../.env.test') })
const axios = require('axios')

main()

async function main () {
  const request = {
    method: 'post',
    // url: `https://cic-external-api.herokuapp.com/api/token`,
    url: `http://localhost:8081/api/token`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      client_id: process.env.TEST_CLIENT_ID,
      client_secret: process.env.TEST_CLIENT_SECRET,
    }
  }

  try {
    const response = await axios(request)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}