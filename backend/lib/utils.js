// Authentication token verification middleware

const jwt = require("jsonwebtoken");

// Generate a token depending on whether it is a refresh token or not
const generateTokens = (user, isRefreshToken) => {
  if (isRefreshToken) {
    // Generate a refresh token with a 60-minute expiration
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "60m",
    });
  } else {
    // Generate an access token with a 40-minute expiration
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "40m" });
  }
};

module.exports = { generateTokens };
