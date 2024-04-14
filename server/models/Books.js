const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Books', {
    book_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Authors',
        key: 'author_id'
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    author_fullname: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Genre',
        key: 'genre_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Books',
    timestamps: false
  });
};
