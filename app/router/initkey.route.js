const { object, string, boolean, array } = require("yup");
const StringFormat = require("string-format");
const { UserController } = require("controllers");
const { 
  TxtConstant, 
  AppConstant,
  ApiConstant,
  ConfigConstant,
} = require("consts");

module.exports = (req, res) => {
  // Create schema
  let requestSchema = object({
    identityKey: string().required(),
    signedPrekey: string().required(),
    signature: string().required(),
    onetimePrekeys: array().of(string()).required(),
  });

  let responseSchema = object({
    success: boolean().required(),
    error: string().default(""),
  })

  // Validate data
  requestSchema.validate(req.body)
    .then(preKeyBundle => {
      UserController.registerKeys(req.authData.userID, req.authData.deviceID, preKeyBundle)
        .then(initKeyOK => {
          if (initKeyOK) {
            res.status(ApiConstant.STT_OK).json(
              responseSchema.cast({
                success: true,
              })
            );
          } else {
            res.status(ApiConstant.STT_OK).json(
              responseSchema.cast({
                success: false,
                error: TxtConstant.TXT_CANNOT_INITIALIZE_KEY_FOR_CLIENT,
              })
            );
          }
        })
    })
    .catch(err => {
      res.status(ApiConstant.STT_OK).json(
        responseSchema.cast({
          success: false,
          error: err.errors[0],
        })
      );
    });
}