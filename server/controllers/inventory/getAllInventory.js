const getAllInventory = async (req, res) => {
  const InventoryModel = req.models.Inventory;
  const inventory = await InventoryModel.findAll();
  res.send(inventory);
};

module.exports = getAllInventory;
