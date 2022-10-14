const { UserModel } = require("models");
const { getRandomInt } = require("utils/buffer.util");
const { ConfigConstant } = require("consts");

// =================================================================================
//                                    KEY OPERATIONS
// =================================================================================

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
      // Update if found new ones
      var newOneTimePrekeys = preKeyBundle.onetimePrekeys.filter(oneTimePrekey => !record.oneTimePrekeys.includes(oneTimePrekey));
      await UserModel.findOneAndUpdate({
        userID: userID,
        deviceID: deviceID,
        identityKey: preKeyBundle.identityKey,
        signedPrekey: preKeyBundle.signedPrekey,
        signature: preKeyBundle.signature,
      }, { $push: { oneTimePrekeys: { $each: newOneTimePrekeys } } })
    }

    return true;
  } 
  catch
  {
    return false;
  }
}

const checkKeyStatus = async (userID, deviceID) => {
  const record = await UserModel.findOne({
    userID: userID,
    deviceID: deviceID,
  });
  
  if (record === null)
    return ConfigConstant.KEY_STATE.notUploaded;
  else if (record.oneTimePrekeys.length < ConfigConstant.LOW_NO_ONE_TIME_PREKEYS)
    return ConfigConstant.KEY_STATE.lowOneTime;
  else
    return ConfigConstant.KEY_STATE.ok;
} 

const checkIfDeviceExists = async (userID, deviceID) => {
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

const fetchPrekeyBundle = async (userID, deviceID) => {
  const record = await UserModel.findOne({
    userID: userID,
    deviceID: deviceID,
  });

  if (record === null)
    return {
      found: false
    };


  // Fetch random one-time key and remove it.
  var randIndex = record.oneTimePrekeys.length !== 0 ? getRandomInt(record.oneTimePrekeys.length) : null;
  var oneTimePrekey = randIndex !== null ? record.oneTimePrekeys[randIndex] : null; 
  if (oneTimePrekey !== null) {
    record.oneTimePrekeys.splice(randIndex, 1);
    await UserModel.updateOne( { _id: record.id }, { 
      $set: { oneTimePrekeys: record.oneTimePrekeys },
    });
  }

  // Return keys
  return {
    found: true,
    identityKey: record.identityKey,
    signedPrekey: record.signedPrekey,
    signature: record.signature,
    oneTimePrekey: oneTimePrekey,
  }
}


// =================================================================================
//                                    PUT MESSAGES
// =================================================================================

const putMessagesToMailbox = async (sendUserID, sendDeviceID, receipientUserID, targetUserID, messageObjs) => {
  var oldDeviceIDs = [];
  var newDeviceIDs = [];

  // Send to already corrected receipients.
  for (var messageObj of messageObjs) {
    if (!await checkIfDeviceExists(receipientUserID, messageObj.receipientDeviceID)) {
      oldDeviceIDs.push(messageObj.receipientDeviceID);
    } else {
      await UserModel.findOneAndUpdate({
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
            receiveUserID: targetUserID,
          }
        }
      });
    }
  }

  // Fetch missing users from request
  const userRecords = await UserModel.find({
    userID: receipientUserID
  });

  const sentDeviceIDs = messageObjs.map(messageObj => messageObj.receipientDeviceID);
  newDeviceIDs = userRecords
                  .map   (record   => record.deviceID)
                  .filter(deviceID => !sentDeviceIDs.includes(deviceID))
                  .filter(deviceID => !(sendUserID === receipientUserID && sendDeviceID === deviceID))

  return [oldDeviceIDs, newDeviceIDs];
}



// =================================================================================
//                                    FETCH MESSAGES
// =================================================================================

const fetchMessagesFromMailbox = async (userID, deviceID) => {
  try {
    const record = await UserModel.findOneAndUpdate({
      userID: userID,
      deviceID: deviceID
    }, {
      $set: { messages: [] }
    });

    await UserModel.findByIdAndUpdate(record.id, {
      $set: { pendingMessages: record.messages.concat(record.pendingMessages) }
    });

    return record.messages.concat(record.pendingMessages)
  }
  catch {
    return null;
  }
}

const clearPendingMessages = async (userID, deviceID) => {
  try {
    await UserModel.findOneAndUpdate({
      userID: userID,
      deviceID: deviceID
    }, {
      $set: { pendingMessages: [] }
    });
    return true;
  }
  catch {
    return false;
  }
}

// =================================================================================
//                                    FETCH USERS
// =================================================================================

const fetchUsersExcept = async (userIDException) => {
  var userIDs = (await UserModel
                  .find({
                      userID: { $ne: userIDException }
                    })
                ).map(record => record.userID);

  // Remove duplicates...
  userIDs = [...new Set(userIDs)];
  return userIDs;
}

module.exports = {
  registerKeys,
  fetchPrekeyBundle,
  checkKeyStatus,
  checkIfDeviceExists,
  
  putMessagesToMailbox,
  fetchMessagesFromMailbox,
  clearPendingMessages,

  fetchUsersExcept,
}