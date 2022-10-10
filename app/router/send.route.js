const { object, string, array, number } = require("yup");
const StringFormat = require("string-format");
const { AuthController } = require("controllers");
const { 
  TxtConstant, 
  AppConstant,
  ApiConstant,
  ConfigConstant,
} = require("consts");

module.exports = (req, res) => {
  // Fetch data from user
  if (!req.params.hasOwnProperty("userID")) {
    // TODO: alert here.
  }

  // 
  const sendUserID = req.authData.userID;
  const sendDeviceID = req.authData.deviceID;
  const receipientUserID = req.params.userID;

  console.log(`${sendUserID} . ${sendDeviceID} --> ${receipientUserID}`)

  // Schema for publishing message to server.
  const requestSchema = array().of(
    object({
      type: number().required().oneOf(Object.values(ConfigConstant.MESSAGE_TYPE)),    // Type of message: initiate / normal
      receipientDeviceID: string().required(),
      message: string().required(),
      header: string().required(),
      timestamp: number().default(Date.now())
    })
  );

  const responseSchema = object({
    oldDeviceIDs: array().of(string()).default([]),
    newDeviceIDs: array().of(string()).default([])
  });

  res.status(ApiConstant.STT_OK).end();
}