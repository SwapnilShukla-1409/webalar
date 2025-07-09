const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const router = express.Router();

// ✅ Login Route
router.post('/login', async (req, res) => {
  try {
    console.log(req.body.username);
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log("User not found:", req.body.username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      console.log("Incorrect password for:", req.body.username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password }); // ❌ no hashing here
    await user.save();

    res.json({ message: 'User registered successfully',username:username });
  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `${field} already exists.` });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});
// ✅ Get all users (for task assignment)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select("username email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


// ✅ Export the router
module.exports = router;
