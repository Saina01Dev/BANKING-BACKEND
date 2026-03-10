require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// connect database
connectDB();

// security middleware
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// test route
app.get("/", (req, res) => {
  res.send("Banking API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});