const { objCheckIfKeyExists } = require("utils/data.util");
const { TxtConstant } = require("consts");

module.exports = (req, res) => {
  var data = req.body;
  if (!objCheckIfKeyExists(data, ["userID", "password"])) {
    res.status(200).json({
      success: false,
      data: "",
      error: TxtConstant.TXT_INVALID_REQUEST_FORMAT
    });
  } else {
    res.status(200).json({
      success: true,
      data: "",
      error: "",
    });
  }
};