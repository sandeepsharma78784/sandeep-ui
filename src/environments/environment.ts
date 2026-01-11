export const environment = {
  production: false,
  auth0: {                          // Auth0 ko kuch bhi naam rakh sakte hain
    domain: 'dev-sandeep-secure.us.auth0.com',
    clientId: 'SMmkS4aqh0NOiGF9opUZBtjkkcfKjP52',
    audience: 'https://sandeep-secure-resource-endpoint/',
    redirectUri: window.location.origin + '/callback'  // Callback URL after login 
  }
};
