const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
  attempts: { type: Number, default: 0 },
});

module.exports = mongoose.model("Otp", otpSchema);
