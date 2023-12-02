// Main file of the application, entry point
// Import the express library to create the server
const express = require("express");
// Import the dotenv library to read environment variables
const dotenv = require("dotenv");
// Import the mongoose library to connect to the database
const mongoose = require("mongoose");
// Import the cors library to enable access to the API from any origin
const cors = require("cors");
// Import the routes
const logins = require("../backend/routes/loginRoutes");
const books = require("./routes/booksRoutes");
const favorites = require("../backend/routes/favoriteRoutes");

// Read environment variables
dotenv.config();
// Create the server
const app = express();

// Enable the use of JSON in the body
app.use(express.json());
// Enable the use of cors
app.use(cors({ origin: "http://localhost:3000" }));

// Route to serve images from the 'uploads' folder
app.use("/uploads", express.static("uploads"));

// Connect to the database
mongoose
  .connect(process.env.DATABASE_URL, {
    // To avoid warnings with the connection URL, apply the new URL parser
    useNewUrlParser: true,
    // To avoid warnings with the database topology, apply the new server
    // discovery and monitoring engine
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.log(err));
// Listen for error events to handle errors after connection
mongoose.connection.on("error", (err) => {
  console.log(err);
});
// Enable the routes
app.use("/auth", logins);
app.use("/library", books);
app.use("/", favorites);

// Start the server
// Listen for connections on the specified port (and host)
// Returns an http.server object
app.listen(process.env.PORT, () => {
  console.log(`Server valid at http://127.0.0.1:${process.env.PORT}`);
});
