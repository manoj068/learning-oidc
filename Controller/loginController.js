const express = require("express");
const loginRouter = express.Router();
const { randomBytes } = require("node:crypto");
const {
  config: {
    endponts: { authEndpoint, logoutEndpoint },
    oidc: { clientId },
  },
} = require("../config");
const { default: axios } = require("axios");

loginRouter.get("/", (req, res) => {
  const authorizationEndpoint = authEndpoint;
  const responseType = "code";
  const scope = "openid%20profile%20email";
  const clientID = clientId;
  const redirectUri = "http://localhost:3000/callback";
  const state = randomBytes(64).toString("hex");

  res.redirect(
    authorizationEndpoint +
      `?response_type=${responseType}&scope=${scope}&client_id=${clientID}&redirect_uri=${redirectUri}&state=${state}&audience=${encodeURIComponent(
        "http://localhost:3000"
      )}`
  );
});
module.exports = { loginRouter };
