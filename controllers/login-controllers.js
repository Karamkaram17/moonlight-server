const User = require("../models/user-model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const SESSIONS = new Map();

const checkUserAuthentication = async (req, res) => {
  const users = await User.find();
  const user = users.find((user) => user.username === req.body.username);
  if (user === undefined) {
    return res.status(404).send("user not found");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const sessionId = crypto.randomBytes(16).toString("hex");
      SESSIONS.set(sessionId, user);
      res
        .cookie("sessionId", sessionId, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        })
        .status(201)
        .send(`authorized as ${req.body.username}`);
    } else {
      res.status(401).send("password is incorrect");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = { checkUserAuthentication };
