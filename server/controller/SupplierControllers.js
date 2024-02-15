const { Supplier } = require("../models");
const catchAsync = require("../utils/catchAsync");



exports.createSupplier = catchAsync(async (req, res) => {
   console.log(req.body)
    // req.body.owner = req.user.id;
    const supplier = await Supplier.create(req.body);
   
  
  
    res.status(201).json({
      status: "success",
      data: supplier,
    });
  });


  exports.getSuppliers = catchAsync(async (req, res) => {
    console.log("==============================================================88888888888888888888888888888888")
    const { limit, page } = req.query;
    const limit2 = limit || 10;
    const page2 = page ||1
  
    const offset = (page2 - 1) * limit || 0;
  
    const suppliers = await Supplier.findAll({
      order: [["createdAt", "DESC"]],
      limit: limit2,
      offset: offset,
    });

    const count = await Supplier.count();
    res.status(200).json({
      status: "success",
      data: suppliers,
      length: count,
    });
  });

  exports.getSupplier = async (req, res) => {
    const supplier = await Supplier.findByPk(req.params.id, { });
    res.status(200).json({
      status: "success",
      data: supplier,
    });
  };

  exports.updateSupplier = catchAsync(async (req, res) => {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);
    await  supplier.update(req.body);
  
    res.status(201).json({
      status: "success",
      data: supplier,
    });
  });
  
  exports.deleteSupplier= catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const supplier = await Supplier.findByPk(id);
  
    await supplier.destroy();
    res.status(200).json({
      status: "seccess",
      data: supplier,
    });
  });