const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require("router");
const {
  AppConstant,
  DbConstant,
} = require("consts");

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

const connectToDatabase = () => {
  mongoose.connection
    .on('error', () => {console.log("Connection to database failed!")})
    .on('disconnected', () => connectToDatabase)
    .once('open', () => {console.log("Connected to MongoDB!")});
  return mongoose.connect(
            DbConstant.DB_URL, 
            { 
              keepAlive: true, 
              useNewUrlParser: true 
            });
}

const registerLinks = () => {
  // -------------- Where we customize our links -------------------
  app.get("/test", Router.TestRoute);
  app.post("/test", Router.TestRoute);
  app.post("/login", Router.LoginRoute);
  app.post("/register", Router.RegisterRoute);
}

const start = () => {
  app.listen(process.env.PORT || AppConstant.PORT, () => {console.log(`Listening at port ${AppConstant.PORT}...`);})
}

const run = () => {
  init();
  connectToDatabase();
  registerLinks();
  start();
}

module.exports = run;
