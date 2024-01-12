const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /users/register
//@access public
exports.registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const registeredUser = await User.findOne({ email });
  if (registeredUser) {
    res.status(400);
    throw new Error("User already registered, please go to login");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, email: user.email, userName: user.userName });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

//@desc Login user
//@route POST /users/login
//@access public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  res.status(200).json({ message: "LogIn functionality incoming" });
});
