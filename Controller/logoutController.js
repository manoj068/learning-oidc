const express = require("express");
const logoutRouter = express.Router();
const {
  config: {
    endponts: { logoutEndpoint },
    oidc: { clientId },
  },
} = require("../config");
const { default: axios } = require("axios");

logoutRouter.get("/", (req, res) => {
  axios(`${logoutEndpoint}?client_id=${clientId}`).then(() => {
    console.log("Logged out successfully");
  });
});

module.exports = { logoutRouter };
