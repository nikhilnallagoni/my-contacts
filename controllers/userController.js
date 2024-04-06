const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//@desc register user
//@route post /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("all filed are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered !");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400);
      throw new Error("user details are not valid");
    }
  }
});
//@desc login user
//@route post /user/login
//@access pubilc
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("all fields are required to login");
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // console.log(user);
      //jwt.sign({ payload , secret , expire time of toekn})
      const accessToken = jwt.sign(
        {
          //payload
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password not valid");
    }
  }
});
//@desc current user
//@route get /user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
module.exports = { registerUser, loginUser, currentUser };
