const { Sequelize } = require("sequelize");
const { Customer, Item } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.createCustomer = catchAsync(async (req, res) => {
  console.log(req.body);
  // req.body.owner = req.user.id;
  const customer = await Customer.create(req.body);

  res.status(201).json({
    status: "success",
    data: customer,
  });
});

exports.getCustomers = catchAsync(async (req, res) => {
  console.log(
    "==============================================================88888888888888888888888888888888",
    req.query
  );
  const { limit, page, searchText } = req.query;
  console.log(
    searchText,
    "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&searchText&&&&&&&&"
  );
  const limit2 = limit || 10;
  const page2 = page || 1;

  const offset = (page2 - 1) * limit || 0;
  let count;

  let whereCondition = {};
  if (searchText?.trim() !== "" && searchText?.trim() !== undefined) {
    console.log(
      "==============================================================inside search text================================",
      searchText
    );
    whereCondition = {
      name: {
        [Sequelize.Op.iLike]: `%${searchText}%`, // Case-insensitive search
      },
    };
    count = await Item.count({ where: whereCondition }); // Count based on the search condition
  } else {
    count = await Customer.count();
  }
  const customers = await Customer.findAll({
    where: whereCondition, // Apply the WHERE clause based on the search condition

    order: [["createdAt", "DESC"]],
    limit: limit2,
    offset: offset,
  });

  res.status(200).json({
    status: "success",
    data: customers,
    length: count,
  });
});

exports.getCustomer = async (req, res) => {
  const customer = await Customer.findByPk(req.params.id, {});
  res.status(200).json({
    status: "success",
    data: customer,
  });
};

exports.updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findByPk(id);
  await customer.update(req.body);

  res.status(201).json({
    status: "success",
    data: customer,
  });
});

exports.deleteCustomer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findByPk(id);

  await customer.destroy();
  res.status(200).json({
    status: "seccess",
    data: customer,
  });
});
