const bcrypt = require("bcrypt");
const { AuthModel } = require("models");

const login = async (userID, password) => {
  try 
  {
    const record = await AuthModel.findOne({
      userID: userID
    });
  
    if (record === null)
      return false;
    return bcrypt.compare(password, record.password);
  }
  catch
  {
    return false;
  }
};

const register = async (userID, password) => {
  try
  {
    const record = await AuthModel.findOne({
      userID: userID
    });
  
    if (record !== null)
      return false;
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await AuthModel.create({
      userID: userID,
      password: hashedPassword,
    });
  
    return true;
  }
  catch
  {
    return false;
  }
};

const isUserExists = async (userID) => {
  return await AuthModel.findOne({
    userID: userID
  }) !== null;
}

module.exports = {
  login, 
  register,
  isUserExists,
}