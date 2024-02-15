const express = require("express");
const {
 createSupplier,deleteSupplier,getSupplier,getSuppliers,updateSupplier
} = require("../controller/SupplierControllers");

const router = express.Router();


router.route("/").get(getSuppliers).post(createSupplier);
router
  .route("/:id")
  .get(getSupplier)
  .patch( updateSupplier)
  .delete( deleteSupplier);

module.exports = router;
