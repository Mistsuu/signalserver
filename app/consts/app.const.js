const crypto = require("crypto");

const PORT = 1208;
const COOKIE_TIMEOUT = 1000 * 60 * 60 * 24;
const SESSION_SECRET = "developed_by_mistsu";  // TODO: Generate random each time server is run
const SECRET_TOKEN = "not_misuha";  // TODO: Generate random each time server is run
// const SESSION_SECRET = crypto.randomBytes(16).toString("hex");
// const SECRET_TOKEN = crypto.randomBytes(16).toString("hex");

module.exports = {
  PORT,
  COOKIE_TIMEOUT,
  SESSION_SECRET,
  SECRET_TOKEN,
}