const express = require("express");
const router = express.Router();

const { checkUserAuthentication } = require("../controllers/login-controllers");

router.route("/").post(checkUserAuthentication);

module.exports = router;
