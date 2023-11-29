// Import the auth controller and define routes for user registration and login
const auth = require("../Controller/auth");
const verifyToken = require("../middlewares/auth"); // Middleware for token verification
const router = require("express").Router();

// Endpoint for user registration
router.post("/signup", auth.signUp);

// Endpoint for user login
router.post("/login", auth.login);

// Route for generating a temporary token for password reset
router.post("/resetpassword", auth.generateTemporaryToken);

// Endpoint for updating user data (requires token verification)
router.put("/update-user-data", verifyToken, auth.updateUserData);

// Endpoint for getting user data (requires token verification)
router.get("/get-user-data", verifyToken, auth.getUserData);

// Endpoint for updating the forgotten password (requires token verification)
router.put("/newpassword", verifyToken, auth.updateUserPassword);

module.exports = router;
