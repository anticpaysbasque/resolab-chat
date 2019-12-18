const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const secret = fs.readFileSync("secret.key");
const User = require("../sequelize/models/user");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username }
    });
    if (!user) {
      res.status(404).json({ message: "user does not exist" });
    }
    if (password !== user.password) {
      res.status(403).json({ message: "invalid password" });
    }
    const payload = { username };
    jwt.sign(payload, secret, { algorithm: "RS256" }, (err, token) => {
      res.status(200).json({ token });
    });
  } catch (err) {
    res.status(418).send("unable to create token");
  }
});

module.exports = router;
