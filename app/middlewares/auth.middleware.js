const { AuthController } = require("controllers");
const { ApiConstant, AppConstant } = require("consts");
const jwt = require("jsonwebtoken");

const verifyTokenExists = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.authToken = bearerToken;
    next();
  } else {
    res.status(ApiConstant.STT_FORBIDDEN).end();
  }
}

const verifyToken = (req, res, next) => {
  jwt.verify(req.authToken, AppConstant.SECRET_TOKEN, (err, authData) => {
    if (err) {
      res.status(ApiConstant.STT_FORBIDDEN).end();
    } else {
      req.authData = authData;
      if (authData.hasOwnProperty("userID") && authData.hasOwnProperty("deviceID")) {
        next();
      } else {
        res.status(ApiConstant.STT_FORBIDDEN).end();
      }
    }
  })
}

const verifyUser = (req, res, next) => {
  AuthController.isUserExists(req.authData.userID)
    .then(answer => {
          if (answer === true) {
            next();
          } else {
            res.status(ApiConstant.STT_FORBIDDEN).end();
          }
          })
    .catch(err => {
            res.status(ApiConstant.STT_FORBIDDEN).end();
          });
}

const AuthMiddleware = [ verifyTokenExists, verifyToken, verifyUser ];
module.exports = AuthMiddleware;