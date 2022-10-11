const { object, string } = require("yup");
const { UserController } = require("controllers");
const { ApiConstant } = require("consts");

module.exports = async (req, res) => {
  // Set a checker to when user is timed-out.
  var isUserConnecting = true;
  req.on('close', () => {
    isUserConnecting = false;
  })

  // Create schemas
  var responseSchema = object({
    identityKey: string().default(""), 
    signedPrekey: string().default(""),
    signature: string().default(""),
    oneTimePrekey: string().default(""),
    error: string().default(""),
  });

  // Get userID, deviceID
  var userID = req.authData.userID;
  var deviceID = req.authData.deviceID;
  while (isUserConnecting) {
    const messages = UserController.fetchMessagesFromMailbox(userID, deviceID);
    await new Promise(r => setTimeout(r, 1000));
  }
}