const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignupData } = require("../utils/validations");
const bcrypt = require('bcrypt');
  
// Create a new user
authRouter.post('/signup', async (req, res) => {
    try {
      // validation of data
      validateSignupData(req.body);
      const { firstName, lastName, emailId, password } = req.body;
  
      // encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      // create a new user
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
      });
      const savedUser = await user.save();
      return res.send(savedUser);
    } catch(error) {
      res.status(400).send("Error saving the user: " + error.message);
    }
});

// login user
authRouter.post('/login', async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({emailId});
      if(!user) {
        throw new Error("Invalid credentials");
      } else {
  
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid) {
          const token = await user.getJWT();
          res.cookie('token', token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
          });
          res.send('Login successful');
        } else {
          throw new Error("Invalid credentials");
        }
      }
    } catch(error) {
      res.status(401).send("Error: " + error.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
});

module.exports = authRouter;