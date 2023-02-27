const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.jwt);
    return res
      .status(200)
      .send({ message: "login success", data: req.user, token });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findById(userId);
    return res.status(200).send({ user: userData });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      throw { message: "userName not found" };
    }

    if (!(await user.passwordMatch(password))) {
      throw { message: "password doesn't match" };
    }

    const token = jwt.sign({ _id: user._id }, process.env.jwt);

    return res
      .status(200)
      .send({ message: "login success", data: user, token });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const sigup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      userName,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.jwt);

    return res
      .status(200)
      .send({ message: "signUp success", data: newUser, token });
  } catch (error) {
    if (error.code == 11000) {
      error = { message: "username must be unique" };
    }
    return res.status(400).send({ error });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userData = await User.find().select("-password");
    return res.status(200).send(userData);
  } catch (e) {
    return res.status(400).send({ error: e });
  }
};
module.exports = { login, sigup, getUser, getAllUser, getUserById };
