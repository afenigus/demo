const express = require("express");
const {
  createItem,
  deleteItem,
  getPurchase,
  getPurchases,
  updatePurchase,
  createPurchase,
  deletePurchase,
} = require("../controller/PurchaseController");

const router = express.Router();

router.route("/").get(getPurchases).post(createPurchase);
router
  .route("/:id")
  .get(getPurchase)
  .patch(updatePurchase)
  .delete(deletePurchase);

module.exports = router;
