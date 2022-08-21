/* Magic Mirror
 * Module: MMM-GoogleDocs-Notes
 *
 * By No3x
 * MIT Licensed.
 */

const fs = require("fs");
const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oauth = new OAuth2Server({
  model: require("./model")
});

// Load client secrets from a local file.
fs.readFile("client_secret.json", (err, content) => {
  if (err) {
    console.log(`Error loading client secret file: ${err}`);
    return;
  }

// Authorization code redirect initiated by "login" event from Sign In button
function redirectToLogin() {
    // Must define all scopes needed for application
  const scope = encodeURIComponent("product.personalized cart.basic:rw profile.full");
    // Build authorization URL
    const url =
        // Base URL (https://api.kroger.com/v1/connect/oauth2)
        `${config.oauth2BaseUrl}/authorize?` +
        // ClientId (specified in .env file)
        `client_id=${encodeURIComponent(config.clientId)}` +
        // Pre-configured redirect URL (http://localhost:3000/callback)
        `&redirect_uri=${encodeURIComponent(config.redirectUrl)}` +
        // Grant type
        `&response_type=code` +
        // Scope specified above
        `&scope=${scope}`;
    // Browser redirects to the OAuth2 /authorize page
    window.location = url;
}

// Handle the call back from authorization server
function handleCallback() {
    const accessToken = cookies.get("accToken");
    const refreshToken = cookies.get("refToken");

    if (!accessToken) {
        return false;
    }
    // Store tokens client side for API requests
    storeTokens(accessToken, refreshToken);

    cookies.remove("accToken");
    cookies.remove("refToken");

    return true;
}


let request = new Request({
  method: "GET",
   headers: {Authorization: "Bearer foobar"},
   query: {}

});

let response = new Response({
  headers: {}
});

oauth.authenticate(request, response)
  .then((token) => {
    // The request was successfully authenticated.
  })
  .catch((err) => {
    // The request failed authentication.
}
        );
});
