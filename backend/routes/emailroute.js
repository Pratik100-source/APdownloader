const express = require("express");
const router = express.Router();
const {
  sendOtp,
  resendOtp,
  verifyOtp,
} = require("../controllers/otpController");

router.post("/sendOtp", sendOtp);
router.post("/resendOtp", resendOtp);
router.post("/verifyOtp", verifyOtp);
module.exports = router;
