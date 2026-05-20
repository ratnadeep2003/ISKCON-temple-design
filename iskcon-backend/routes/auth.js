const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this matches your file name exactly

// 1. GET ALL USERS (For Users.jsx dashboard)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error fetching users" });
  }
});

// 2. REGISTER NEW USER (From Login.jsx Modal or Admin Add User)
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists by email OR phone
    let userExists = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }]
    });

    if (userExists) {
      return res.status(400).json({ message: "Email or Phone number already registered" });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password // Plain-text configuration matching your current setup
    });

    await newUser.save();
    res.status(201).json({ message: "Devotee registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration" });
  }
});

// 3. LOGIN ROUTE (Updated with tracking logs)
router.post("/login", async (req, res) => {
  const { email, password } = req.body; 

  console.log("=== Login Attempt ===");
  console.log("Received Input Identifier:", email);
  console.log("Received Input Password:", password);

  try {
    // 1. Locate user record
    const user = await User.findOne({
      $or: [
        { email: email.trim().toLowerCase() },
        { phone: email.trim() }
      ]
    });

    if (!user) {
      console.log("❌ Login failed: No user found matching identifier:", email);
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    console.log("Found User in DB:", user.name);
    console.log("DB Password string:", user.password);

    // 2. Validate Password (trimming white spaces just in case)
    if (user.password.trim() !== password.trim()) {
      console.log("❌ Login failed: Password mismatch!");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    console.log("✅ Login successful for:", user.name);
    res.json({ 
      message: `Welcome back, ${user.name}!`, 
      user: { id: user._id, name: user.name } 
    });

  } catch (err) {
    console.error("Backend login error stack:", err);
    res.status(500).json({ message: "Server Error during login" });
  }
});

// 4. DELETE USER ROUTE (For Users.jsx dashboard actions)
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User record successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error deleting user" });
  }
});

module.exports = router;