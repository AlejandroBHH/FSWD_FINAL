const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Importar las funciones para mockear las fechas y generar los tokens
const { generateTokens } = require("../lib/utils");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const role = req.body.role || "user";

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Missing required fields: name, fullName, email, password",
    });
  }

  try {
    const existingUserByName = await User.findOne({ name });
    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByName) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    if (existingUserByEmail) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      role,
      isActive: false,
    });

    await newUser.save();

    const payload = {
      id: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    };

    const token = generateTokens(payload, false);

    res.status(201).json({
      status: "succeeded",
      data: { user: newUser, token },
      error: null,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        error: "Email already exists",
      });
    } else if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.name
    ) {
      return res.status(400).json({
        error: "Username already exists",
      });
    } else {
      return res.status(500).json({
        error: `Unknown error: ${error.message}`,
      });
    }
  }
};

// Controller for the POST /auth/login route
const login = async (req, res) => {
  try {
    // Get data from the request body
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    // If the user does not exist, send an error
    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Wrong email or password, please try again",
      });
    }

    // Get the hash of the stored password from the database
    const storedPasswordHash = user.password;

    // Verify if the provided password matches the stored hash
    const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        data: null,
        error: "Incorrect password, please try again",
      });
    }

    // If the password is correct, generate the token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateTokens(payload, false);

    // Generate the refresh token
    const refreshToken = generateTokens(payload, true);

    await user.save();

    // Send the token
    res.status(200).json({
      status: "succeeded",
      data: { user, token, refreshToken },
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

// Generate a temporary token for changing the password in the case of having the email in the database for forgetPassword
const generateTemporaryToken = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a temporary token with a short expiration time
    const token = generateTokens({ email }, false);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating temporary token:", error);
    res.status(500).json({
      error: "An error occurred while generating the temporary token",
    });
  }
};

// Controller for the PUT /auth/update-user-data route
const updateUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID from token:", userId);

    let user;

    if (userId) {
      // Find the user in the database by their ID
      user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: "failed",
          data: null,
          error: "User not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Email or ID is required",
      });
    }

    // Update the user data with the values provided in the request body
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    // Update the password if provided in the request body
    if (req.body.confirmPassword) {
      // Generate the hash of the new password using bcrypt
      const newPasswordHash = await bcrypt.hash(req.body.confirmPassword, 10);
      user.password = req.body.confirmPassword;
    }

    // Save the changes to the database
    await user.save();

    // Respond with the updated user data
    res.status(200).json({
      status: "succeeded",
      data: { user },
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

// Controller for the GET /auth/get-user-data route
const getUserData = async (req, res) => {
  try {
    // Get the ID of the authenticated user from the token
    const userId = req.user.id;

    // Find the user in the database by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "User not found",
      });
    }

    // Respond with the user data
    res.status(200).json({
      status: "succeeded",
      data: { user },
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

// Controller for the PUT /auth/update-user-password route
const updateUserPassword = async (req, res) => {
  try {
    const userEmail = req.user.email;
    console.log("User Email from token:", userEmail);

    let user;

    if (userEmail) {
      // Find the user in the database by their email
      user = await User.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({
          status: "failed",
          data: null,
          error: "User not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Email is required",
      });
    }

    // Update the password if provided in the request body
    if (req.body.newPassword) {
      // Generate the hash of the new password using bcrypt
      const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
      user.password = newPasswordHash;
    } else {
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "New password is required",
      });
    }

    // Save the changes to the database
    await user.save();

    // Respond with a success message
    res.status(200).json({
      status: "succeeded",
      data: { message: "Password updated successfully" },
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: null,
      error: err.message,
    });
  }
};

module.exports = {
  signUp,
  login,
  generateTemporaryToken,
  updateUserData,
  getUserData,
  updateUserPassword,
};
