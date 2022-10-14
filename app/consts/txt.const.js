// Texts
const TXT_INVALID_REQUEST_FORMAT = "Invalid request format!";
const TXT_USERNAME_OR_PASSWORD_IS_WRONG = "Username or password is wrong!";
const TXT_CANNOT_CREATE_SESSION = "Cannot create session for user!";
const TXT_CANNOT_INITIALIZE_KEY_FOR_CLIENT = "Cannot register keys for user!";
const TXT_NO_USER_ID_FOUND_FOR_RECEIPIENT = "No userID found for recipient!";
const TXT_PLEASE_UPDATE_DEVICE_LIST = "Please update device list and send again.";
const TXT_CANNOT_FETCH_KEY_WITHOUT_USERID_OR_DEVICEID = "Cannot fetch keys without the userID or deviceID.";
const TXT_THIS_PATH_ONLY_SEND_TO_YOU_OR_THE_RECEIPIENT = "Wrong path in sending! You can only /send/{you}/{recp} or /send/{recp}/{you}.";
const TXT_USER_NOT_FOUND = "User not found!?";

// Formats
const FM_USERNAME_LEN_ERR = "Username must be >= {0} and <= {1} in length.";
const FM_PASSWORD_LEN_ERR = "Password must be >= {0} and <= {1} in length.";
const FM_USER_ALREADY_DEFINED = "User \"{0}\" has already been registered!";

module.exports = {
  // Texts
  TXT_INVALID_REQUEST_FORMAT,
  TXT_USERNAME_OR_PASSWORD_IS_WRONG,
  TXT_CANNOT_CREATE_SESSION,
  TXT_CANNOT_INITIALIZE_KEY_FOR_CLIENT,
  TXT_NO_USER_ID_FOUND_FOR_RECEIPIENT,
  TXT_PLEASE_UPDATE_DEVICE_LIST,
  TXT_CANNOT_FETCH_KEY_WITHOUT_USERID_OR_DEVICEID,
  TXT_THIS_PATH_ONLY_SEND_TO_YOU_OR_THE_RECEIPIENT,
  TXT_USER_NOT_FOUND,
  // Formats
  FM_USERNAME_LEN_ERR,
  FM_PASSWORD_LEN_ERR,
  FM_USER_ALREADY_DEFINED,
};