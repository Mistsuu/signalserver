const { object, string } = require("yup");
const { AuthController } = require("controllers");
const { 
  TxtConstant, 
  ApiConstant,
} = require("consts");

module.exports = (req, res) => {
  var responseSchema = object({
    error: string().default("")
  });

  AuthController.logout(req.authData.userID, req.authData.deviceID)
    .then(logoutSuccess => {
      if (logoutSuccess) {
        res.status(ApiConstant.STT_OK).json(
          responseSchema.cast({})
        )
      } else {
        res.status(ApiConstant.STT_BAD_REQUEST).json(
          responseSchema.cast({
            error: TxtConstant.TXT_USER_NOT_FOUND
          })
        )
      }
    })
    .catch(err => {
      res.status(ApiConstant.STT_INTERNAL_SERVER).end()
    })
};