'use strict';

const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userID: String,
  password: String,
  registerAt: { type: Date, default: Date.now },
}, { collection: "auth" });

module.exports = mongoose.model('auth', authSchema);