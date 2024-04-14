const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Inventory",
    {
      Inventory_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
      },
      rarity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Books",
          key: "book_id",
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      item_state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "Inventory",
      timestamps: false,
    }
  );
};
