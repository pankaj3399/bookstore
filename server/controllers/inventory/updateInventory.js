const updateInventory = async (req, res) => {
  const InventoryModel = req.models.Inventory;
  const { book_id, quantity, cost } = req.body;

  try {
    // Find the inventory record for the book
    const inventoryItem = await InventoryModel.findOne({
      where: { book_id: book_id },
    });

    if (inventoryItem) {
      // Update the quantity and cost
      await inventoryItem.update({ quantity, cost });

      res.status(200).send({ msg: "Inventory updated successfully" });
    } else {
      res.status(404).send("Inventory record not found");
    }
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = updateInventory;
