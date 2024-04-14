const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const initModels = require("./models/init-models");
const routes = require("./routes/routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./bookstore.db",
});

const models = initModels(sequelize);
console.log(models);

app.use(cors());

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(function (req, res, next) {
  req.root = req.protocol + "://" + req.get("host") + "/";
  req.models = models;
  next();
});

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
