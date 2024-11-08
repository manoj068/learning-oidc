const express = require("express");
const callBackrouter = express.Router();
const { default: axios } = require("axios");
const {
  config: {
    oidc: { clientId, clientSecret },
    endponts: { tokenEndpoint, redirectUri },
  },
} = require("../config");
const { jwtDecode } = require("jwt-decode");

callBackrouter.get("/", async (req, res) => {
  const code = req.query.code;

  const options = {
    method: "POST",
    url: tokenEndpoint,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    }),
  };

  axios
    .request(options)
    .then((response) => {
      const {
        data: { id_token, access_token },
      } = response;

      return res
        .cookie("access_token", access_token, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({ id_token: jwtDecode(id_token) });
    })
    .catch((error) => {
      console.log("Error while getting Access token", error.message);
      res.status(401).redirect("/login");
    });
});

module.exports = { callBackrouter };
