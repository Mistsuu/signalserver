'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const login = new Schema({
  userID: { type: String, default: '' },
  password: { type: String, default: '' },
  registerAt: { type: Date, default: Date.now },
}, { collection: "login" });

module.exports = mongoose.model('login', login);