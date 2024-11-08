const dotenv = require("dotenv");
dotenv.config();

const config = {
  oidc: {
    provider: process.env.OIDC_PROVIDER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  endponts: {
    tokenEndpoint: process.env.TOKEN_ENDPOINT,
    authEndpoint: process.env.AUTH_ENDPOINT,
    redirectUri: process.env.REDIRECT_URI,
    logoutEndpoint: process.env.LOGOUT_ENDPOINT,
  },
};

module.exports = { config };
