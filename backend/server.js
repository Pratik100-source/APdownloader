const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const connectDB = require("./config/dbconfig");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });
connectDB();

const port = process.env.PORT || 3000;
app.use(cors());

app.listen(port, () => {
  console.log("server is running on port " + port);
});
