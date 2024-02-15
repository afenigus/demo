const express = require("express");
const {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
  searchItems,
} = require("../controller/ItemController");

const router = express.Router();

router.route("/").get(getItems).post(createItem);
router.route("/search").get(searchItems);
router.route("/:id").get(getItem).patch(updateItem).delete(deleteItem);

module.exports = router;
