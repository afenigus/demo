const express = require("express");
const {
 createCustomer,deleteCustomer,getCustomer,getCustomers,updateCustomer
} = require("../controller/CustomerControllers");

const router = express.Router();

router.route("/").get(getCustomers).post(createCustomer);
router
  .route("/:id")
  .get(getCustomer)
  .patch( updateCustomer)
  .delete( deleteCustomer);

module.exports = router;