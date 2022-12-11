const express = require("express");
const router = express.Router();

const {
  getAllItems,
  addItem,
  getOneItem,
  updateItem,
  deleteItem,
} = require("../controllers/items-controllers");

router.route("/").get(getAllItems).post(addItem);
router.route("/:id").get(getOneItem).patch(updateItem).delete(deleteItem);

module.exports = router;
