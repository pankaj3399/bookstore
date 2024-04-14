const express = require("express");
const checkout = require("../controllers/cart/checkout");
const router = express.Router();

//routes

router.post("/checkout", checkout);

module.exports = router;
