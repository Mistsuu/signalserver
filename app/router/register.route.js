const { object, string, boolean } = require("yup");
const StringFormat = require("string-format");
const { 
  TxtConstant, 
  ApiConstant,
  ConfigConstant,
} = require("consts");

module.exports = (req, res) => {
  // Create schemas
  let requestSchema = object({
    userID: string()
              .required()
              .min(ConfigConstant.USERNAME_MINLEN, StringFormat(TxtConstant.FM_USERNAME_LEN_ERR, ConfigConstant.USERNAME_MINLEN, ConfigConstant.USERNAME_MAXLEN))
              .max(ConfigConstant.USERNAME_MAXLEN, StringFormat(TxtConstant.FM_USERNAME_LEN_ERR, ConfigConstant.USERNAME_MINLEN, ConfigConstant.USERNAME_MAXLEN)),
    password: string()
                .required()
                .min(ConfigConstant.PASSWORD_MINLEN, StringFormat(TxtConstant.FM_PASSWORD_LEN_ERR, ConfigConstant.PASSWORD_MINLEN, ConfigConstant.PASSWORD_MAXLEN))
                .max(ConfigConstant.PASSWORD_MAXLEN, StringFormat(TxtConstant.FM_PASSWORD_LEN_ERR, ConfigConstant.PASSWORD_MINLEN, ConfigConstant.PASSWORD_MAXLEN)),
  });

  let responseSchema = object({
    success: boolean().required(),
    error: string().default(""),
  });

  // Validate data
  requestSchema.validate(req.body)
    .then(data => {
      res.status(ApiConstant.STT_OK).json(
        responseSchema.cast({
          success: true,
        })
      );
    })
    .catch(err => {
      res.status(ApiConstant.STT_OK).json(
        responseSchema.cast({
          success: false,
          error: err.errors[0],
        })
      );
    })
};