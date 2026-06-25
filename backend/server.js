require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/dbconfig");

const rateLimit = require("express-rate-limit");

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use(limiter);
app.use(cors());
app.use(express.json());

connectDB();

//routes
const authRoutes = require("./routes/authentication");
const emailRoutes = require("./routes/emailroute");

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

//ports
const port = process.env.PORT || 3000;
app.use(cors());

app.listen(port, () => {
  console.log("server is running on port " + port);
});
