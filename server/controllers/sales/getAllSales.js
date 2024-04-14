const getAllSales = async (req, res) => {
  const SalesModel = req.models.Sales;
  const sales = await SalesModel.findAll();
  res.send(sales);
};

module.exports = getAllSales;
