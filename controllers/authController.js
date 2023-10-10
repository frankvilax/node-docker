const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashpassword });
    req.session.user = newUser;
    res.status(201).json({
      data: {
        newUser,
      },
    });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user; // saving user info on the cookie
      res.status(200).json({
        message: "Success",
      });
    } else {
      res.status(400).json({
        message: "Incorrect password",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      results: users.length,
      data: {
        users,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
};
