const express = require("express");
const router = express.Router();

const {
  getAllItems,
  addItem,
  getOneItem,
  updateItem,
  deleteItem,
} = require("../controllers/items-controllers");

// app.get("/menu/data", getAllItems);
// app.post("/menu/data", addItem);
// app.get("/menu/data/:id", getOneItem);
// app.put("/menu/data/:id", updateItem);
// app.delete("/menu/data/:id", deleteItem);

router.route("/").get(getAllItems).post(addItem);
router.route("/:id").get(getOneItem).put(updateItem).delete(deleteItem);

module.exports = router;
