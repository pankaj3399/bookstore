const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Book_Categories', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'books',
        key: 'book_id'
      }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genre',
        key: 'genre_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Book_Categories',
    timestamps: false
  });
};
