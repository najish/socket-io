const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // adjust path if needed

// User Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }


    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// User Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if(password !== user.password) {
        return res.status(400).json({message:"Invalidafasdfladflajds"})
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email,name:user.name },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "365d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { signup, login };
