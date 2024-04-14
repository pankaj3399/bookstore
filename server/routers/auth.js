const express = require("express");
const signin = require("../controllers/auth/signin");
const router = express.Router();

//routes
router.post("/signin", signin);

module.exports = router;
