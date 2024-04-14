var DataTypes = require("sequelize").DataTypes;
var _Authors = require("./Authors");
var _Book_Categories = require("./Book_Categories");
var _Books = require("./Books");
var _Cart = require("./Cart");
var _Cart2 = require("./Cart2");
var _Genre = require("./Genre");
var _Inventory = require("./Inventory");
var _Sales = require("./Sales");
var _users = require("./users");

function initModels(sequelize) {
  var Authors = _Authors(sequelize, DataTypes);
  var Book_Categories = _Book_Categories(sequelize, DataTypes);
  var Books = _Books(sequelize, DataTypes);
  var Cart = _Cart(sequelize, DataTypes);
  var Cart2 = _Cart2(sequelize, DataTypes);
  var Genre = _Genre(sequelize, DataTypes);
  var Inventory = _Inventory(sequelize, DataTypes);
  var Sales = _Sales(sequelize, DataTypes);
  var Users = _users(sequelize, DataTypes);

  Books.belongsTo(Authors, { as: "author", foreignKey: "author_id" });
  Authors.hasMany(Books, { as: "Books", foreignKey: "author_id" });
  Cart.belongsTo(Books, { as: "book", foreignKey: "book_id" });
  Books.hasMany(Cart, { as: "Carts", foreignKey: "book_id" });
  Cart2.belongsTo(Books, { as: "book", foreignKey: "book_id" });
  Books.hasMany(Cart2, { as: "Cart2s", foreignKey: "book_id" });
  Inventory.belongsTo(Books, { as: "book", foreignKey: "book_id" });
  Books.hasMany(Inventory, { as: "Inventories", foreignKey: "book_id" });
  Sales.belongsTo(Books, { as: "book", foreignKey: "book_id" });
  Books.hasMany(Sales, { as: "Sales", foreignKey: "book_id" });
  Books.belongsTo(Genre, { as: "genre", foreignKey: "genre_id" });
  Genre.hasMany(Books, { as: "Books", foreignKey: "genre_id" });
  Cart.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Cart, { as: "Carts", foreignKey: "user_id" });
  Book_Categories.belongsTo(Books, { as: "book", foreignKey: "book_id" });
  Books.hasMany(Book_Categories, {
    as: "Book_Categories",
    foreignKey: "book_id",
  });
  Book_Categories.belongsTo(Genre, { as: "genre", foreignKey: "genre_id" });
  Genre.hasMany(Book_Categories, {
    as: "Book_Categories",
    foreignKey: "genre_id",
  });

  return {
    Authors,
    Book_Categories,
    Books,
    Cart,
    Cart2,
    Genre,
    Inventory,
    Sales,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
