const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addUser = async (req, res) => {
  try {
    const users = await User.find();
    const isUsernameTaken = users.find(
      (user) => user.username === req.body.username
    );
    if (isUsernameTaken) {
      return res.status(400).send("username already exist");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send(`${username} does not exist`);
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOneAndDelete({ username: username });
    if (!user) {
      return res.status(404).send(`${username} does not exist`);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllUsers, addUser, getOneUser, deleteUser };
