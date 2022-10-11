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
      type: Number,
      header: String,
      message: String,
      messageID: String,
      timestamp: Number,
      sendUserID: String,
      sendDeviceID: String,
      receiveUserID: String,
    })
  ],
  pendingMessages: [
    new mongoose.Schema({
      type: Number,
      header: String,
      message: String,
      messageID: String,
      timestamp: Number,
      sendUserID: String,
      sendDeviceID: String,
      receiveUserID: String,
    })
  ]
});

module.exports = mongoose.model("user", userSchema);