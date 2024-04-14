const getAllBooks = require("../controllers/book/getAllBooks");

const express = require("express");
const router = express.Router();

//routes
router.get("/", getAllBooks);

module.exports = router;
