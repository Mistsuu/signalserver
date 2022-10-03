// Routes
const ROUTE_LOGIN = "/login";
const ROUTE_REGISTER = "/register";
const ROUTE_TEST = "/test";

// HTTP status
const STT_OK = 200;
const STT_BAD_REQUEST = 400;
const STT_UNAUTHORIZED = 401;
const STT_FORBIDDEN = 403;
const STT_NOT_FOUND = 404;
const STT_INTERNAL_SERVER = 500;

// HTTP methods
const METHOD_DELETE = "DELETE";
const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";

module.exports = {
  // Routes
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_TEST,
  // HTTP status
  STT_OK,
  STT_BAD_REQUEST,
  STT_UNAUTHORIZED,
  STT_FORBIDDEN,
  STT_NOT_FOUND,
  STT_INTERNAL_SERVER,
  // Methods
  METHOD_PUT,
  METHOD_DELETE,
  METHOD_GET,
  METHOD_POST,
}