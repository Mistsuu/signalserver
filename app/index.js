require('module-alias/register');
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// port app use
const PORT = 1208;

// create app
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));