const express = require("express");
const router = express.Router();
const bookRouter = require("../routers/book");
const inventoryRouter = require("../routers/inventory");
const cartRouter = require("../routers/cart");
const authRouter = require("../routers/auth");
const salesRouter = require("../routers/sales");

const apiRoutes = [
  {
    path: "/book",
    route: bookRouter,
  },
  {
    path: "/inventory",
    route: inventoryRouter,
  },
  {
    path: "/cart",
    route: cartRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/sales",
    route: salesRouter,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
module.exports = router;
