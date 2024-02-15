const { Cash, Item, Customer } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.createCash = catchAsync(async (req, res) => {
  console.log(req.body);
  // req.body.owner = req.user.id;
  const cash = await Cash.create(req.body);

  res.status(201).json({
    status: "success",
    data: cash,
  });
});

exports.getCashs = catchAsync(async (req, res) => {
  console.log(
    "==============================================================88888888888888888888888888888888"
  );
  const { limit, page } = req.query;
  const limit2 = limit || 10;
  const page2 = page || 1;

  const offset = (page2 - 1) * limit || 0;

  const cashs = await Cash.findAll({
    include: [{ model: Item }, { model: Customer }],
    order: [["createdAt", "DESC"]],
    limit: limit2,
    offset: offset,
  });

  const count = await Cash.count();
  res.status(200).json({
    status: "success",
    data: cashs,
    length: count,
  });
});

exports.getCash = async (req, res) => {
  const cash = await Cash.findByPk(req.params.id, {});
  res.status(200).json({
    status: "success",
    data: cash,
  });
};

exports.updateCash = catchAsync(async (req, res) => {
  const { id } = req.params;
  const cash = await Cash.findByPk(id);
  await cash.update(req.body);

  res.status(201).json({
    status: "success",
    data: cash,
  });
});

exports.deleteCash = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const cash = await Cash.findByPk(id);

  await cash.destroy();
  res.status(200).json({
    status: "seccess",
    data: cash,
  });
});
