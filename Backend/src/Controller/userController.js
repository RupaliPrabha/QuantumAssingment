const User = require("../Schema/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { name, email, password, dob } = req.body;

  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  try {
    console.log("email:", email);
    if (!email) {
      return res.status(400).send({ msg: "Email is required" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).send({ msg: "Invalid email format" });
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(409).send({ msg: "Email is already registered" });
    }

    if (!password) {
      return res.status(400).send({ msg: "Password is required" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = { name, email, password: hashedPassword, dob };

    const user = await User.create(data);
    console.log(user, "This is user :");
    res.status(201).send({ status: true, msg: " You are Sucessfully Registered!", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, msg: error });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "email-password");

    // Find the user by email
    const registerUser = await User.findOne({ email });
    console.log(registerUser);

    // If user does not exist
    if (!registerUser) {
      return res.status(400).send({ msg: "User not found" });
    }

    const id = registerUser._id;
    console.log(id, "id");

    // Compare passwords
    const userPassword = await bcrypt.compare(password, registerUser.password);
    console.log(userPassword);

    // If password matches
    if (userPassword) {
      // Generate a token
      const token = jwt.sign({ _id: id }, process.env.SECRET_KEY);

      // Save the token in the user's record
      registerUser.token = registerUser.token || [];
      registerUser.token.push(token);
      await registerUser.save();

       res.status(200).send({
        status: true,
        msg: "User login successfully",
        data: { userId: id, token: token },
      });
    } else {
      res.status(400).send({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
const getAllUser = async (req, res) => {

    try {
        
        const userdata = await User.find();
        res.status(200).send({status: true, msg: "success", data: userdata });        
      } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error });
      }
  
};
const logout = async (req, res) => {
  try {

    const token = req.header('authorization').split(" ")[1];
    console.log(token,"token");
    
  console.log(req.user,"user object");
  
    // Remove the token from the user token array
    req.user.token = req.user.token.filter((UserToken) => UserToken !== token);

    await req.user.save();

    res.status(200).json({ status: true, message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error });
  }
};


module.exports = { userRegister, userLogin, getAllUser ,logout};
