const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send("Unauthorized access");
      return;
    }

    // getting token
    const token = authHeader.split(" ")[1];

    // verify token
    let verifiedUser = null;
    verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verifiedUser; // role  , userid

    if (verifiedUser.role !== "Admin") {
      res.status(403).send("You are forbidden to do this action!!");
    }

    next();
  } catch (error) {
    res.status(403).send("You are forbidden to do this action!!");
    return;
  }
}

module.exports = auth;
