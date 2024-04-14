const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const UserModel = req.models.Users;
  if (!req.body.username || !req.body.password)
    res.status(400).send("Invalid username or password");
  const user = await UserModel.findOne({
    where: { user_name: req.body.username },
  });
  if (!user) {
    res.status(400).send("Invalid username or password");
    return;
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password_hash
  );
  if (!isValidPassword) {
    res.status(400).send("Invalid username or password");
    return;
  }
  if (user.user_roles !== "Admin") {
    res.status(400).send("Invalid user");
    return;
  }

  const payload = {
    firstName: user.first_name,
    lastName: user.last_name,
    userName: user.user_name,
    role: user.user_roles,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_SECRET_EXP,
  });
  console.log(token);
  res.status(200).send({ token });
};

module.exports = signin;
