'use strict';

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userID: String,
  deviceID: String,
  identityKey: String,
  signedPrekey: String,
  signature: String,
  oneTimePrekeys: [String],
  usedOneTimeKeys: [String],
  messages: [
    new mongoose.Schema({
      message: String,
      header: String,
    })
  ]
});

module.exports = mongoose.model("user", userSchema);