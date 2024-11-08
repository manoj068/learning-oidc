const express = require("express");
const request = require("request-promise");
const tokenRouter = express.Router();
const { jwtDecode } = require("jwt-decode");
const {
  config: {
    endponts: { tokenEndpoint },
    oidc: { clientId, clientSecret },
  },
} = require("../config");

tokenRouter.get("/access-token", (req, res) => {
  const options = {
    method: "POST",
    uri: tokenEndpoint,
    headers: JSON.stringify({
      "content-type": "application/x-www-form-urlencoded",
    }),
    form: {
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      audience: "http://localhost:3000",
    },
    json: true,
  };

  request(options)
    .then((response) => {
      res.status(200).json(jwtDecode(response.access_token));
    })
    .catch((error) => {
      console.log("Error while getting Access token", error);
      res.status(401).send("Unauthorized");
    });
});

module.exports = { tokenRouter };
