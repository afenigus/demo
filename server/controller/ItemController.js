const { Item } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.createItem = catchAsync(async (req, res) => {
  console.log(req.body);
  // req.body.owner = req.user.id;
  const item = await Item.create(req.body);

  res.status(201).json({
    status: "success",
    data: item,
  });
});
exports.searchItems = catchAsync(async (req, res) => {
  const { limit, page, searchText } = req.query;
  const limit2 = limit || 10;
  const page2 = page || 1;
  const offset = (page2 - 1) * limit2 || 0;
  let count;
  let whereCondition = {}; // Define an empty object for the WHERE clause

  if (searchText) {
    whereCondition = {
      name: {
        [Sequelize.Op.iLike]: `%${searchText}%`, // Case-insensitive search
      },
    };
  }

  const items = await Item.findAll({
    where: whereCondition, // Apply the WHERE clause based on the search condition
    order: [["createdAt", "DESC"]],
    limit: limit2,
    offset: offset,
  });

  count = await Item.count({ where: whereCondition }); // Count based on the search condition

  res.status(200).json({
    status: "success",
    data: items,
    length: count,
  });
});

exports.getItems = catchAsync(async (req, res) => {
  console.log(
    "==============================================================88888888888888888888888888888888"
  );
  const { limit, page, searchText } = req.query;
  const limit2 = limit || 10;
  const page2 = page || 1;
  let count;
  const offset = (page2 - 1) * limit || 0;
  let whereCondition = {}; // Define an empty object for the WHERE clause

  if (searchText) {
    count = await Item.count({ where: whereCondition }); // Count based on the search condition

    whereCondition = {
      name: {
        [Sequelize.Op.iLike]: `%${searchText}%`, // Case-insensitive search
      },
    };
  } else {
    count = await Item.count();
  }
  const items = await Item.findAll({
    where: whereCondition, // Apply the WHERE clause based on the search condition
    order: [["createdAt", "DESC"]],
    limit: limit2,
    offset: offset,
  });

  res.status(200).json({
    status: "success",
    data: items,
    length: count,
  });
});

exports.getItem = async (req, res) => {
  const item = await Item.findByPk(req.params.id, {});
  res.status(200).json({
    status: "success",
    data: item,
  });
};

exports.updateItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);
  await item.update(req.body);

  res.status(201).json({
    status: "success",
    data: item,
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const item = await Item.findByPk(id);

  await item.destroy();
  res.status(200).json({
    status: "seccess",
    data: item,
  });
});
