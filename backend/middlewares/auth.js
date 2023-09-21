const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    // Verificamos si el token de acceso valida con la firma
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    // Token de refresco
    const refreshToken = req.header("refresh-token");
    if (!refreshToken) {
      return res.status(401).send("Access Denied");
    }
    try {
      // Verificamos si el token de refresco valida con la firma
      const verified = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).send("Expired token");
    }
  }
};

module.exports = verifyToken;
