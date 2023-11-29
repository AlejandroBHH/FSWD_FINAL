const jwt = require("jsonwebtoken");

// Middleware function to verify the authenticity of an access token
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");

  // Check if the token is present in the request headers
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    // Verify if the access token is valid and retrieve user data
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    // Handle the case where the token has expired
    res.status(400).send("Expired token");
  }
};

module.exports = verifyToken;
