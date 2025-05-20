const UserModel = require("../models/user.model");
const tokenService = require("../services/token.service");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  user.password = undefined;

  return res.status(200).json({
    message: "Account created successfully!!",
    user,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordMatch(password))) {
    res.status(401).json({
      status: false,
      message: "Incorrect Email or Password",
    });
  }

  const token = await tokenService.generateAuthTokens(user);

  user.password = undefined;

  return res.status(200).json({
    success: true,
    message: "User Signed In successfully!!",
    token,
    user,
  });
};

module.exports = {
    signUp,
    signIn
};
