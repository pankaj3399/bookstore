const express = require("express");
const getAllSales = require("../controllers/sales/getAllSales");
const auth = require("../middleware/auth");
const router = express.Router();

//routes
router.get("/", auth, getAllSales);

module.exports = router;
