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

module.exports = {
  registerKeys
}