const { UserModel } = require("models");

const registerKeys = async (userID, deviceID, preKeyBundle) => {
  try 
  {
    // Find record by userID & deviceID.
    const record = await UserModel.findOne({
      userID: userID,
      deviceID: deviceID,
    });

    // Create a record if null
    if (record === null)
      await UserModel.create({
        userID: userID,
        deviceID: deviceID,
        identityKey: preKeyBundle.identityKey,
        signedPrekey: preKeyBundle.signedPrekey,
        signature: preKeyBundle.signature,
        oneTimePrekeys: preKeyBundle.onetimePrekeys,
      });
    else if (record.identityKey !== preKeyBundle.identityKey)
      return false;
    else if (record.signedPrekey !== preKeyBundle.signedPrekey)
      return false;
    else if (record.signature !== preKeyBundle.signature)
      return false;
    else {
      // Get a list of already published one time keys
      var alreadyPublishedOneTimes = [];
      alreadyPublishedOneTimes = alreadyPublishedOneTimes.concat(record.oneTimePrekeys).concat(record.usedOneTimeKeys);

      // Update if found new ones
      var newOneTimes = preKeyBundle.onetimePrekeys.filter(oneTimePrekey => !alreadyPublishedOneTimes.includes(oneTimePrekey));
      await UserModel.findOneAndUpdate({
        userID: userID,
        deviceID: deviceID,
        identityKey: preKeyBundle.identityKey,
        signedPrekey: preKeyBundle.signedPrekey,
        signature: preKeyBundle.signature,
      }, { $push: { oneTimePrekeys: { $each: newOneTimes } } })
    }

    return true;
  } 
  catch
  {
    return false;
  }
}

const checkIfKeyExists = async (userID, deviceID) => {
  try 
  {
    const record = await UserModel.findOne({
      userID: userID,
      deviceID: deviceID,
    });
    return record !== null;
  } 
  catch 
  {
    return false;
  }
} 

const putMessagesToMailbox = async (sendUserID, sendDeviceID, receipientUserID, messageObjs) => {
  var oldDeviceIDs = [];
  var newDeviceIDs = [];

  // Send to already corrected receipients.
  for (var messageObj of messageObjs) {
    if (!await checkIfDeviceExists(receipientUserID, messageObj.receipientDeviceID)) {
      oldDeviceIDs.append(deviceID);
    } else {
      UserModel.findOneAndUpdate({
        userID: receipientUserID,
        deviceID: messageObj.receipientDeviceID,
      }, {
        $push: {
          messages: {
            type: messageObj.type,
            header: messageObj.header,
            message: messageObj.message,
            messageID: messageObj.messageID,
            timestamp: messageObj.timestamp,
            sendUserID: sendUserID,
            sendDeviceID: sendDeviceID,
          }
        }
      })
    }
  }

  // Fetch missing users from request
  const userRecords = await UserModel.find({
    userID: receipientUserID
  });

  const sentDeviceIDs = messageObjs.map(messageObj => messageObj.receipientDeviceID);
  newDeviceIDs = userRecords
                  .map   (record => record.deviceID)
                  .filter(record => !sentDeviceIDs.includes(record.deviceID));

  return [oldDeviceIDs, newDeviceIDs];
}

const checkIfDeviceExists = checkIfKeyExists;

module.exports = {
  registerKeys,
  checkIfKeyExists,
  checkIfDeviceExists,
  putMessagesToMailbox,
}