const { object, string, array, number } = require("yup");
const StringFormat = require("string-format");
const { AuthController, UserController } = require("controllers");
const { 
  TxtConstant, 
  AppConstant,
  ApiConstant,
  ConfigConstant,
} = require("consts");

module.exports = (req, res) => {
  // Schema for publishing message to server.
  const requestSchema = array().of(
    object({
      type: number().required().oneOf(Object.values(ConfigConstant.MESSAGE_TYPE)),    // Type of message: initiate / normal
      receipientDeviceID: string().required(),
      message: string().required(),
      header: string().required(),
      messageID: string().required(),
      timestamp: number().required(),
    })
  );
    
    const responseSchema = object({
      oldDeviceIDs: array().of(string()).default([]),
      newDeviceIDs: array().of(string()).default([]),
      error: string().default(""),
    });
    
    // Get user's data
    if (!req.params.hasOwnProperty("userID")) {
      res.status(ApiConstant.STT_BAD_REQUEST)
        .json(responseSchema.cast({
          error: TxtConstant.TXT_NO_USER_ID_FOUND_FOR_RECEIPIENT
        }))
    } else {
      const sendUserID = req.authData.userID;
      const sendDeviceID = req.authData.deviceID;
      const receipientUserID = req.params.userID;
      // console.log(`${sendUserID}.${sendDeviceID} --> ${receipientUserID}`)
  
      requestSchema.validate(req.body)
        .then(messages => {
          UserController.putMessagesToMailbox(sendUserID, sendDeviceID, receipientUserID, messages)
            .then(([oldDeviceIDs, newDeviceIDs]) => {
              if (oldDeviceIDs.length || newDeviceIDs.length) {
                res.status(ApiConstant.STT_CONFLICT).json(
                  responseSchema.cast({
                    oldDeviceIDs: oldDeviceIDs,
                    newDeviceIDs: newDeviceIDs,
                    error: TxtConstant.TXT_PLEASE_UPDATE_DEVICE_LIST
                  })
                )
              } else {
                res.status(ApiConstant.STT_OK).json(
                  responseSchema.cast({})
                );
              }
            })
            .catch(err => {
              res.status(ApiConstant.STT_BAD_REQUEST).json(
                responseSchema.cast({
                  error: err.errors[0],
                })
              );
            });
        })
        .catch(err => {
          res.status(ApiConstant.STT_BAD_REQUEST).json(
            responseSchema.cast({
              error: err.errors[0],
            })
          );
        });
    }
}