const express = require("express");
const router = express.Router();
const { authenticate } = require("../middelware/authenticate");

const {
  getAllItems,
  addItem,
  getOneItem,
  updateItem,
  deleteItem,
} = require("../controllers/items-controllers");

router.route("/").get(getAllItems).post(authenticate, addItem);
router
  .route("/:id")
  .get(getOneItem)
  .patch(authenticate, updateItem)
  .delete(authenticate, deleteItem);

module.exports = router;
