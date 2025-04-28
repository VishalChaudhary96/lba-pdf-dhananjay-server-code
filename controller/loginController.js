const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Login Controller
module.exports = login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ "personalDetails.email": email });

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch =
      (password === user.personalDetails.password && true) || false;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.personalDetails.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
