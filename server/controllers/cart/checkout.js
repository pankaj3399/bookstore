const { Sequelize } = require("sequelize");

const checkout = async (req, res) => {
  const bookIds = req.body.cart.map((x) => x.bookId);
  const InventoryModel = req.models.Inventory;
  const SalesModel = req.models.Sales;
  const BooksModel = req.models.Books;
  const inventoryItems = await InventoryModel.findAll({
    where: {
      book_id: bookIds,
    },
  });
  // Fetch book titles for the ordered books
  const bookTitles = await BooksModel.findAll({
    attributes: ["book_id", "title"],
    where: { book_id: bookIds },
  });
  await InventoryModel.update(
    { quantity: Sequelize.literal("quantity - 1") }, // Decrement quantity by 1
    { where: { book_id: bookIds } } // Update where book_id is in bookIds array
  );
  let notPossible = false;
  // Create entries in the Sales table
  const salesEntries = inventoryItems.map((inventoryItem) => {
    const bookTitle = bookTitles.find(
      (book) => book.book_id === inventoryItem.book_id
    )?.title;

    if (inventoryItem.quantity <= 0) {
      notPossible = true;
    }

    return {
      book_id: inventoryItem.book_id,
      book_title: bookTitle,
      quantity: 1,
      cost: inventoryItem.cost * 1, // Assuming the cost is per item
    };
    // Bulk create entries in the Sales table
  });
  await SalesModel.bulkCreate(salesEntries);
  if (notPossible) {
    res.status(400).send("Checkout Failed. Please try again!");
  } else {
    res.send("Checkout Successful");
  }
};

module.exports = checkout;
