const userid = 'test'
const params = {
  name: `m2m-${userid}`,
  description: `The Client Credentials for user ${userid}`,
  logo_uri: 'https://raw.githubusercontent.com/WolbachAuth0/auth0-m2m-demo/main/public/api-icon.png',
  allowed_clients: [],
  callbacks: [],
  grant_types: [ 'client_credentials' ],
  token_endpoint_auth_method: 'client_secret_post',
  app_type: 'non_interactive',
  is_first_party: true,
  oidc_conformant: true,
  sso_disabled: false,
  cross_origin_auth: false,
  custom_login_page_on: true,
  client_metadata: {
    userid
  }
}

console.log(JSON.stringify(params))