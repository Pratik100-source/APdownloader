const transporter = require("../config/emailconfig");
const Otp = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const User = require("../models/users");

const GMAIL_PATTERN = /^[^\s@]+@gmail\.com$/i;

// reusable functions

//function for generating otp

const generateOtp = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
};

//function for hashing otp and password
const hashing = async (normal) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(normal, salt);
  return hashed;
};

const normalizeEmail = (email) => email.trim().toLowerCase();

const isGmailAddress = (email) => GMAIL_PATTERN.test(email);

//main function to send otp

const sendOtp = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email ? normalizeEmail(req.body.email) : "";
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!isGmailAddress(email)) {
      return res.status(400).json({
        message: "Please enter a valid Gmail address.",
      });
    }

    const isAlreadyRegistered = await User.findOne({ email: email });
    console.log(isAlreadyRegistered ? "true" : "false");
    if (isAlreadyRegistered) {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }

    const otp = generateOtp();
    const hashedOtp = await hashing(otp);
    const hashedPassword = await hashing(password);

    // 2. Wrap sendMail to intercept instant syntax/routing blocks
    let info;
    try {
      info = await transporter.sendMail({
        from: process.env.email,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      });
    } catch (mailError) {
      console.error("Nodemailer immediate crash:", mailError);
      return res.status(400).json({
        message: "Email address format is rejected by the mail server.",
      });
    }

    // 3. Inspect if your SMTP provider explicitly rejected the recipient
    if (info.rejected && info.rejected.includes(email)) {
      return res.status(400).json({
        message: "The recipient address was rejected by the mail server relay.",
      });
    }

    // 4. Only save to DB and send 200 OK if everything succeeded
    const newOtp = new Otp({
      name: name,
      email: email,
      password: hashedPassword,
      otp: hashedOtp,
    });
    await newOtp.save();

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to send OTP due to a server error.",
    });
  }
};

const resendOtp = async (req, res) => {
  try {
    const email = req.body.email ? normalizeEmail(req.body.email) : "";
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (isGmailAddress(email)) {
      const otp = generateOtp();
      const hashedOtp = await hashing(otp);

      const otpData = await Otp.findOne({ email: email });
      if (!otpData) {
        return res.status(404).json({
          message: "OTP data not found for the provided email",
        });
      }

      let info;
      try {
        info = await transporter.sendMail({
          from: process.env.email,
          to: email,
          subject: "Your OTP Code",
          text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
        });
      } catch (mailError) {
        return res
          .status(400)
          .json({ message: "Email delivery failed instantly." });
      }

      if (info.rejected && info.rejected.includes(email)) {
        return res
          .status(400)
          .json({ message: "Address rejected by mail relay." });
      }

      otpData.otp = hashedOtp;
      await otpData.save();

      return res.status(200).json({
        message: "OTP resent successfully",
      });
    } else {
      return res
        .status(400)
        .json({ message: "Please enter a valid Gmail address." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to resend OTP",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.body.email ? normalizeEmail(req.body.email) : "";
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!otp) {
      return res.status(400).json({
        message: "otp not provided",
      });
    }

    const otpData = await Otp.findOne({ email });

    if (!otpData) {
      return res.status(404).json({
        message: "OTP data not found for the provided email",
      });
    }

    const hashedOtp = otpData.otp;
    console.log("hashedOtp", hashedOtp);
    console.log("entered otp:", otp);
    console.log("otp data:", otpData);

    const attemptCount = otpData.attempts;
    if (attemptCount < 5) {
      const isMatch = await bcrypt.compare(otp, hashedOtp);
      console.log("result:", isMatch);
      console.log(attemptCount);

      if (!isMatch) {
        console.log("didn't match");
        otpData.attempts = attemptCount + 1;
        await otpData.save();
        return res.status(400).json({
          message: "Otp didn't match",
        });
      }

      const newUser = new User({
        name: otpData.name,
        email: otpData.email,
        password: otpData.password,
      });

      await newUser.save();
      await Otp.deleteOne({ _id: otpData._id });

      return res.status(200).json({
        message: "Successfully verified",
      });
    } else {
      return res.status(400).json({
        message: "You have no attempt left",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to verify otp",
    });
  }
};
module.exports = { sendOtp, resendOtp, verifyOtp };
