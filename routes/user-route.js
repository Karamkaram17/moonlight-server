const express = require("express");
const router = express.Router();
const { authenticate } = require("../middelware/authenticate");

const {
  getAllUsers,
  addUser,
  getOneUser,
  deleteUser,
} = require("../controllers/user-controllers");

router.route("/").get(getAllUsers).post(addUser);
router.route("/:username").get(getOneUser).delete(authenticate, deleteUser);

module.exports = router;
