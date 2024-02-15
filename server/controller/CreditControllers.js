const { Credit,Item,Customer } = require("../models");
const catchAsync = require("../utils/catchAsync");



exports.createCredit = catchAsync(async (req, res) => {
   console.log(req.body)
    // req.body.owner = req.user.id;
    const credit = await Credit.create(req.body);
   
  
  
    res.status(201).json({
      status: "success",
      data: credit,
    });
  });


  exports.getCredits = catchAsync(async (req, res) => {
    console.log("==============================================================88888888888888888888888888888888")
    const { limit, page } = req.query;
    const limit2 = limit || 10;
    const page2 = page ||1
  
    const offset = (page2 - 1) * limit || 0;
  
    const credits = await Credit.findAll({
    include: [{ model: Item},{model:Customer}],
      order: [["createdAt", "DESC"]],
      limit: limit2,
      offset: offset,
    });

    const count = await Credit.count();
    res.status(200).json({
      status: "success",
      data: credits,
      length: count,
    });
  });

  exports.getCredit = async (req, res) => {
    const credit = await Credit.findByPk(req.params.id, { });
    res.status(200).json({
      status: "success",
      data: credit,
    });
  };

  exports.updateCredit = catchAsync(async (req, res) => {
    const { id } = req.params;
    const credit = await Credit.findByPk(id);
    await  credit.update(req.body);
  
    res.status(201).json({
      status: "success",
      data: credit,
    });
  });
  
  exports.deleteCredit= catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const credit = await Credit.findByPk(id);
  
    await credit.destroy();
    res.status(200).json({
      status: "seccess",
      data: credit,
    });
  });