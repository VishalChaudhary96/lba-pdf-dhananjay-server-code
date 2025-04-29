const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.headers["authorization"]; // Extract the token from the Authorization header
  if (!token) {
    return res.status(403).send("Token is required!");
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Replace with your actual secret key
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(401).send("Invalid token!");
  }
};

module.exports = authorization;
