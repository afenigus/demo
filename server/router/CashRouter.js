const express = require("express");
const {
  getCash,
  getCashs,
  updateCash,
  createCash,
  deleteCash,
} = require("../controller/CashControllers");

const router = express.Router();

router.route("/").get(getCashs).post(createCash);
router
  .route("/:id")
  .get(getCash)
  .patch(updateCash)
  .delete(deleteCash);

module.exports = router;
