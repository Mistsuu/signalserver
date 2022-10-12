const { object, string, array, number } = require("yup");
const { UserController } = require("controllers");
const { ApiConstant, ConfigConstant } = require("consts");

module.exports = async (req, res) => {
  // Create schema
  const responseSchema = object({
    userIDs: array().of(string().required()).default([]),
    error: string().default(""),
  })
  
  try {
    const userIDs = await UserController.fetchUsersExcept(req.authData.userID);
    res.status(ApiConstant.STT_OK).json(
      responseSchema.cast({
        userIDs: userIDs
      })
    )
  }
  catch (err) {
    console.log(err)
    res.status(ApiConstant.STT_INTERNAL_SERVER).end();
  }
}