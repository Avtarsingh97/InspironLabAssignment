const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Create an instance of the Express app
const app = express();

//DB connection
require("./config/db.js");

//route configuration
const routes = require("./routes/v1/index.js");
const config = require("./config/index.js");

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "*",
  })
);

// Middleware to parse incoming JSON payloads
app.use(express.json());
// Middleware to parse URL-encoded data (e.g., from forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Default base route to confirm the API is working
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Notes API! Please use the /v1 route to access the API endpoints.",
  });
});

// Register API routes with prefix
app.use(config.PREFIX, routes);

// Start the server on the specified port
app.listen(config.PORT, () => {
  console.log(`Server running on port http://localhost:${config.PORT}`);
});
