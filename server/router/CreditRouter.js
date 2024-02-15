const express = require("express");
const {
  getCredit,
  getCredits,
  updateCredit,
  createCredit,
  deleteCredit,
} = require("../controller/CreditControllers");

const router = express.Router();

router.route("/").get(getCredits).post(createCredit);
router
  .route("/:id")
  .get(getCredit)
  .patch(updateCredit)
  .delete(deleteCredit);

module.exports = router;
