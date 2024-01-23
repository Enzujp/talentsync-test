const mongoose = require("mongoose");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../../config/token");

module.exports.get_signup= (req, res) => {
    res.send("Sign up Page!")
}

module.exports.post_signup = async (req, res) => {
    try {
        const { username, password } = req.body
        // Check to see if user already exists
        const existingUser = await User.findOne({ username: username })
        if (existingUser) {
            return res.status(403).json({
                message: "User already exists, please pick a different username."
            })
        }

        // Create hashedPassword for new user 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            password: hashedPassword
        });

        // Create user Token and save user
        const token = createToken(user._id);
        await user.save();

        return res.status(201).json({
            message: "User created Successfully!",
            User: user.username,
            userToken: token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports.get_login = (req, res) => {
    res.send("Login page!")
}

module.exports.post_login = async (req, res) => {
    try {
        const {username, password} = req.body;
        // Confirm that User account exists
        const user = await User.findOne({ username: username })
        if (!user) {
          res.status(404).json({
            message: "Error, This User doesn't exist!"
          })
        } 
        else {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
            // Create token if password is valid.
            const token = createToken(user._id)
            res.status(200).json({
              success: true,
              message: "User successfully logged in",
              _token: token
            })
          }
          else {
            res.status(401).json({
              success: false,
              message: "Wrong Password"
            })
          }
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({
          error: error.message
        });
      };
  };