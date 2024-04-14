const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Sales",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Books",
          key: "book_id",
        },
      },
      book_title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Sales",
      timestamps: false,
    }
  );
};
