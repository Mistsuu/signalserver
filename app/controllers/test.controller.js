const { UserModel } = require("models");

const testModel = async () => {
  await UserModel.create({
    userID: "123",
    deviceID: "234",
    signedPrekey: "567",
    signature: "7789",
  });

  await UserModel.updateOne(
    { userID: "123" },
    { $push: { oneTimePrekeys: {keyID: "123", key: "124809"} } },
  );
}

module.exports = {
  testModel
}