const { object, string, boolean } = require("yup");
const StringFormat = require("string-format");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { AuthController } = require("controllers");
const { 
  TxtConstant, 
  AppConstant,
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

  let JWTDataSchema = object({
    userID: string().required(),
    deviceID: string().required(),
  })

  let responseSchema = object({
    success: boolean().required(),
    error: string().default(""),
    token: string().default(""),
    deviceID: string().default(""),
  })

  // Validate data
  requestSchema.validate(req.body)
    .then(data => {
      // Validate userID, deviceID, password here.
      AuthController.login(data.userID, data.password)
        .then(loginOK => {
          if (loginOK == true) {
            // Generate a device ID
            const deviceID = crypto.randomBytes(16).toString('hex');

            // Set JWT signature
            jwt.sign(
              JWTDataSchema.cast({
                userID: data.userID,
                deviceID: deviceID,
              }),
              AppConstant.SECRET_TOKEN,
              (err, token) => {
                if (!err) {
                  res.status(ApiConstant.STT_OK).json(
                    responseSchema.cast({
                      success: true,
                      token: token,
                      deviceID: deviceID,
                    })
                  );
                } else {
                  res.status(ApiConstant.STT_OK).json(
                    responseSchema.cast({
                      success: false,
                      error: TxtConstant.TXT_CANNOT_CREATE_SESSION,
                    })
                  );
                }
              }
            )
          }
          else {
            res.status(ApiConstant.STT_OK).json(
              responseSchema.cast({
                success: false,
                error: TxtConstant.TXT_USERNAME_OR_PASSWORD_IS_WRONG,
              })
            );
          }
          
        })
    })
    .catch(err => {
      res.status(ApiConstant.STT_OK).json(
        responseSchema.cast({
          success: false,
          error: err.errors[0],
        })
      );
    });
};