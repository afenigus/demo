// server run
// data connection
// mvc  model , router, controller
const { Item } = require("./models");
const AppErorr = require("./utils/appError");
const { errHandling } = require("./utils/errorController");

const express = require("express");
const { Sequelize } = require("sequelize");
const itemRouter = require("./router/ItemRouter");
const purchaseRouter = require("./router/purchaseRouter");
const supplierRouter = require("./router/SupplierRouter");
const customerRouter = require("./router/CustomerRouter");
const cashRouter = require("./router/CashRouter");
const creditRouter = require("./router/CreditRouter");

const cors = require("cors");
const sequelize = new Sequelize("stock", "postgres", "marshal2020", {
  host: "localhost",
  dialect: "postgres",
});

const app = express();
app.use(cors());
app.use(express.json());

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

//
app.use("/items", itemRouter);
app.use("/supplier", supplierRouter);
app.use("/purchase", purchaseRouter);
app.use("/customer", customerRouter);
app.use("/cash", cashRouter);
app.use("/credit", creditRouter);

app.all("*", (req, res, next) => {
  return next(new AppErorr("Page is not found", 404));
});
app.use(errHandling);
app.listen(8000, () => {
  console.log("server is runnning on port 8000");
});
