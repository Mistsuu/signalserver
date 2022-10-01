/*
*   middleware.js: Check for user logging-in/logging-out.
*/

var checkLogin = (req, res, next) => {
  return next();
}

module.exports = {
  checkLogin
}