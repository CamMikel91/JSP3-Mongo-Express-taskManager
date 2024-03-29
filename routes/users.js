const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser, validateLogin } = require("../models/user.js");

// Login a user
router.post("/login", async (req, res) => {
  // Validate the user input
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  // Check if the password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password.");
  }

  // Send the user object back to the client
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(token);
});

// Register a user
router.post("/register", async (req, res) => {
  // Validate the user input
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Email already registered.");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  // Generate a token and add header,
  // then send the user object back to the client
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
});

module.exports = router;
