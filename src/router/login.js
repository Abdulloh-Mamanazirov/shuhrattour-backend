const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const USERNAME = "shuhrattour";
const PASSWORD = "admin123";
const SECRET = process.env.SECRET_KEY || "secret_key_for_admin";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, SECRET);
    res.json({ message: "Muvaffaqiyatli kirildi!", token });
  } else {
    res.status(401).json({ message: "Parol yoki login xato!" });
  }
});

module.exports = router;
