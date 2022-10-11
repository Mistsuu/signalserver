const { object, string, array, number } = require("yup");
const { UserController } = require("controllers");
const { ApiConstant, ConfigConstant } = require("consts");

module.exports = async (req, res) => {
  // Set a checker to when user is timed-out.
  var isUserConnecting = true;
  req.on('close', () => {
    isUserConnecting = false;
  })

  // Create schema
  var responseSchema = object({
    error: string().default(""),
    messages: array().of(object({
      type: number().oneOf(Object.values(ConfigConstant.MESSAGE_TYPE)),
      header: string().required(),
      message: string().required(),
      messageID: string().required(),
      timestamp: number().required(),
      sendUserID: string().required(),
      sendDeviceID: string().required(),
    })).default([])
  });

  // Get userID, deviceID
  var userID = req.authData.userID;
  var deviceID = req.authData.deviceID;
  while (isUserConnecting) {
    // Fetch message from the database
    const messages = await UserController.fetchMessagesFromMailbox(userID, deviceID);
    if (messages === null) {
      res.status(ApiConstant.STT_INTERNAL_SERVER).end();
      break;
    } 

    // If message exists, return data, else keep polling until client's bored.
    else if (messages.length !== 0) {
      res.status(ApiConstant.STT_OK).json(
        responseSchema.validateSync({
          messages: messages
        })
      )
      break;
    }

    // Wait for 1s.
    await new Promise(r => setTimeout(r, 1000));
  }
}