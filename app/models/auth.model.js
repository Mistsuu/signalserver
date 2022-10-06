'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authSchema = new Schema({
  userID: { type: String, default: '' },
  password: { type: String, default: '' },
  registerAt: { type: Date, default: Date.now },
}, { collection: "auth" });

module.exports = mongoose.model('auth', authSchema);