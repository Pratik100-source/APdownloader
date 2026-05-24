require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/dbconfig");

connectDB();

const port = process.env.PORT || 3000;
app.use(cors());

app.listen(port, () => {
  console.log("server is running on port " + port);
});
