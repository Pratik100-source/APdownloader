const mongoose = require("mongoose");

const mongouri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongouri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
