const express = require("express");
const router = express.Router();
const { authenticate } = require("../middelware/authenticate");
const {
  getUserEditorCSS,
  getUserEditorHtml,
  getUserEditorJs,
} = require("../controllers/users-editor-controllers");

router.route("/").get(authenticate, getUserEditorHtml);

router.route("/style.css").get(authenticate, getUserEditorCSS);

router.route("/script.js").get(authenticate, getUserEditorJs);

module.exports = router;
//hi
