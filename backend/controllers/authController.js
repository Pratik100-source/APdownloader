const User = require("../models/users");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const Users = new User({
      name: name,
      email: email,
      password: password,
    });
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        Users.save()
          .then(() => resolve())
          .catch((err) => reject(err));
      }, 5000);
    });
    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    return res.status(500).send("faild to register the user");
  }
};

const loginUser = async (req, res) => {
  const { email, password, rememberme } = req.body;

  try {
    if (!email) {
      res.status(400).json({
        message: "Please enter the email first",
      });
    }

    if (!password) {
      res.status(400).json({
        message: "Please enter the password first",
      });
    }

    const userData = await User.findOne({ email: email });
    console.log(userData);
    console.log(password);
    console.log(email);
    console.log(rememberme);
    console.log(userData.password);
    if (!userData) {
      console.log("No such user found");
      res.status(404).json({
        message: "Either password or email doesn't match",
      });
    }
    const hashedPassword = userData.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      res.status(404).json("Either password or email doesn't match");
    }
    return res.status(200).json({
      message: "Succesfully logged in",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser };
