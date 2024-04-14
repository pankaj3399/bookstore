const express = require("express");
const getAllInventory = require("../controllers/inventory/getAllInventory");
const auth = require("../middleware/auth");
const updateInventory = require("../controllers/inventory/updateInventory");
const router = express.Router();

//routes
router.put("/", auth, updateInventory);
router.get("/", getAllInventory);

module.exports = router;
