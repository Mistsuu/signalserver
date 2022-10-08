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

    return true;
  } 
  catch
  {
    return false;
  }
}

module.exports = {
  registerKeys
}