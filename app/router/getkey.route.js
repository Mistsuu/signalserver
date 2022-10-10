const { object, boolean, string } = require("yup");
const { UserController } = require("controllers");
const { ApiConstant, TxtConstant } = require("consts");

module.exports = (req, res) => {
  if (!req.params.hasOwnProperty("userID") || !req.params.hasOwnProperty("deviceID")) {
    res.status(ApiConstant.STT_BAD_REQUEST)
    .json(responseSchema.cast({
      error: TxtConstant.TXT_CANNOT_FETCH_KEY_WITHOUT_USERID_OR_DEVICEID
    }))
  } else {
    // Create schemas
    var responseSchema = object({
      identityKey: string().default(""), 
      signedPrekey: string().default(""),
      signature: string().default(""),
      oneTimePrekey: string().default(""),
      error: string().default(""),
    })
    
    // Get user's data
    var userID = req.params.userID;
    var deviceID = req.params.deviceID;

    // Get prekey
    UserController.fetchPrekeyBundle(userID, deviceID)
      .then(({ found, ...preKeyBundle }) => {
        if (found) {
          res.status(ApiConstant.STT_OK).json(
            responseSchema.cast({
              ...preKeyBundle
            })
          )
        } 
        else {
          res.status(ApiConstant.STT_NOT_FOUND).json(
            responseSchema.cast({
              error: TxtConstant.TXT_NOT_FOUND_KEY,
            })
          )
        }
      })
  }

}