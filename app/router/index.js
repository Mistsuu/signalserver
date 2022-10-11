const TestRoute = require("./test.route");

const LoginRoute = require("./login.route");
const RegisterRoute = require("./register.route");

const SendMessagesRoute = require("./sendMessages.route");
const FetchMessagesRoute = require("./fetchMessages.route");
const ClearMessagesRoute = require("./clearMessages.route");

const InitKeyRoute = require("./initkey.route");
const CheckKeyStatusRoute = require("./checkkeystatus.route");
const GetKeyRoute = require("./getkey.route");

module.exports = {
  TestRoute,
  
  LoginRoute,
  RegisterRoute,

  SendMessagesRoute,
  FetchMessagesRoute,
  ClearMessagesRoute,

  InitKeyRoute,
  GetKeyRoute,
  CheckKeyStatusRoute,
}