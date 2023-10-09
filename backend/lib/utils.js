//aquí verificamos los token (middleware de autenticación)

const jwt = require("jsonwebtoken");

//genere un token u otro dependiendo si es de refresco o no.
const generateTokens = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "60m",
    });
  } else {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "15m" });
  }
};

module.exports = { generateTokens };
