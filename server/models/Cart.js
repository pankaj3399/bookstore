const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cart', {
    cart_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Books',
        key: 'book_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Cart',
    timestamps: false
  });
};
