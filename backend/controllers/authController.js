const User = require("../models/users");
// const bcrypt = require("bcrypt");

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

module.exports = { registerUser };
