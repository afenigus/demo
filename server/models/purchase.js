"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, { foreignKey: "ItemId" });
    }
  }
  Purchase.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
      unitPrice: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );
  return Purchase;
};
