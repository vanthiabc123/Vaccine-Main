const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.post("/", async (req, res) => {
  const { username, password, email, phone, age, gender, address } = req.body;
  const users = await User.findOne({ email });
  if (users) {
    return res.status(400).json({ error: 'Email đã tồn tại.' });
  }else{
  const user = new User({
    username,
    password,
    email,
    phone,
    age,
    address,
    gender,
  });
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
}
});

module.exports = router;
