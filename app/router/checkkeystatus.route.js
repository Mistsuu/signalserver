const { object, boolean } = require("yup");
const { UserController } = require("controllers");
const { ApiConstant } = require("consts");

module.exports = (req, res) => {
  let responseSchema = object({
    isKeyExists: boolean().required(),
  })

  UserController.checkIfKeyExists(req.authData.userID, req.authData.deviceID)
    .then(isKeyExists => {
      res.status(ApiConstant.STT_OK).json(
        responseSchema.cast({
          isKeyExists: isKeyExists,
        })
      );
    })
}