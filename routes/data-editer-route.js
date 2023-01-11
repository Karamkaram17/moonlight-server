const express = require("express");
const router = express.Router();
const { authenticate } = require("../middelware/authenticate");
const {
  getEditItemsCss,
  getEditItemsHtml,
  getEditItemsJs,
  getEditItemCss,
  getEditItemHtml,
  getEditItemJs,
} = require("../controllers/data-editor-controllers");

router.route("/").get(authenticate, getEditItemsHtml);
router.route("/edit-items.css").get(authenticate, getEditItemsCss);
router.route("/edit-items.js").get(authenticate, getEditItemsJs);

router.route("/edit-item.html").get(authenticate, getEditItemHtml);
router.route("/edit-item.css").get(authenticate, getEditItemCss);
router.route("/edit-item.js").get(authenticate, getEditItemJs);

module.exports = router;
