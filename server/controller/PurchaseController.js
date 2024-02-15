const { Purchase, Item } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.createPurchase = catchAsync(async (req, res) => {
  console.log(req.body);
  console.log(
    "==============================================================88888888888888888888888888888888"
  );
  // req.body.owner = req.user.id;
  //purchasen eyagegnew aydelem
  const purchase = await Purchase.create(req.body);

  res.status(201).json({
    status: "success",
    data: purchase,
  });
});

exports.getPurchases = catchAsync(async (req, res) => {
  console.log(
    "==============================================================88888888888888888888888888888888"
  );
  let count;
  const { limit, page, searchText } = req.query;
  const limit2 = limit || 10;
  const page2 = page || 1;

  const offset = (page2 - 1) * limit || 0;
  let whereCondition = {};
  // const items = await Item.findAll({

  //     order: [["createdAt", "DESC"]],
  //     limit: limit2,
  //     offset: offset,
  //   });
  if (searchText) {
    whereCondition = {
      name: {
        [Sequelize.Op.iLike]: `%${searchText}%`,
      },
    };
    count = await Item.count({ where: whereCondition });
  } else {
    count = await Purchase.count();
  }
  const purchases = await Purchase.findAll({
    include: [{ model: Item }],
    order: [["createdAt", "DESC"]],
    where: whereCondition,
    limit: limit2,
    offset: offset,
  });

  res.status(200).json({
    status: "success",
    data: purchases,
    length: count,
  });
});

exports.getPurchase = async (req, res) => {
  const purchase = await Purchase.findByPk(req.params.id, {});
  res.status(200).json({
    status: "success",
    data: purchase,
  });
};

exports.updatePurchase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const purchase = await Purchase.findByPk(id);
  await purchase.update(req.body);

  res.status(201).json({
    status: "success",
    data: purchase,
  });
});

exports.deletePurchase = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const purchase = await Purchase.findByPk(id);

  await purchase.destroy();
  res.status(200).json({
    status: "seccess",
    data: purchase,
  });
});
