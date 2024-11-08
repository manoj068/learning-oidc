const express = require("express");
var bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const { default: axios } = require("axios");
const { loginRouter } = require("./Controller/loginController");
const { callBackrouter } = require("./Controller/callbackController");
const {
  config: {
    oidc: { provider },
    endponts: { logoutEndpoint },
  },
} = require("./config");
const { tokenRouter } = require("./Controller/accessToken");
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let oidcInfo;

axios(`https://${provider}/.well-known/openid-configuration`)
  .then((res) => {
    oidcInfo = res.data;
  })
  .catch((error) => {
    console.error(error);
    console.error(`Unable to get OIDC endpoints for ${provider}`);
    process.exit(1);
  });

app.use("/login", loginRouter);

app.use("/callback", callBackrouter);

// app.use("/", tokenRouter);

app.get("/logout", (req, res) => {
  res.redirect(logoutEndpoint);
});

app.listen(3000, () => {
  console.log("App is listing on port 3000");
});
