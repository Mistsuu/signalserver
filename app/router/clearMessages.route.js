const { ApiConstant } = require("consts");
const { UserController } = require("controllers");

module.exports = (req, res) => {
  UserController.clearPendingMessages(req.authData.userID, req.authData.deviceID)
    .then(success => {
      if (success)
        res.status(ApiConstant.STT_OK).end();
      else
        res.status(ApiConstant.STT_INTERNAL_SERVER).end();
    })
}