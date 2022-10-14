const { object, number } = require("yup");
const { UserController } = require("controllers");
const { ApiConstant, ConfigConstant } = require("consts");

module.exports = (req, res) => {
  let responseSchema = object({
    keyStatus: number().oneOf(Object.values(ConfigConstant.KEY_STATE)),
  })

  UserController.checkKeyStatus(req.authData.userID, req.authData.deviceID)
    .then(keyStatus => {
      res.status(ApiConstant.STT_OK).json(
        responseSchema.cast({
          keyStatus: keyStatus,
        })
      );
    })
    .catch(err => {
      res.status(ApiConstant.STT_INTERNAL_SERVER).end();
    })
}