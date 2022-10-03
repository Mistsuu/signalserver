const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const cors = require('cors');

const {
  AppConstant,
  ApiConstant,
} = require("consts");

const Router = require("router");

var app = express();
const init = () => {
  // -------------- Where we customize our initialization -------------------
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(sessions({
      secret: AppConstant.SESSION_SECRET,
      saveUninitialized: true,
      cookie: { maxAge: AppConstant.COOKIE_TIMEOUT },
      resave: false
  }));
}

const registerLinks = () => {
  // -------------- Where we customize our links -------------------
  app.get(ApiConstant.TEST, Router.TestRoute);
  app.post(ApiConstant.TEST, Router.TestRoute);
}

const start = () => {
  // -------------- Where we customize our start -------------------
  app.listen(AppConstant.PORT, () => {console.log(`Listening at port ${AppConstant.PORT}...`);})
}

const run = () => {
  init();
  registerLinks();
  start();
}

module.exports = {
  run
}
