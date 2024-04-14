const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cart2', {
    cart_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'book_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Cart2',
    timestamps: false
  });
};
