const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validations");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

// Create a new user
app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
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

app.get('/profile', userAuth, async(req, res) => {
  try {
    console.log(req.user);
    const user = req.user;
    res.send(user);
  } catch(error) {
    res.status(401).send("Error: " + error.message);
  }
});

app.post('/sendConnectionRequest', userAuth, async(req, res) => {
  const user = req.user;
  // sending a connection request
  console.log("sending a connection request");
  res.send(user.firstName + " has sent a connection request");
});

// Get user by email
app.get("/user", userAuth, async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }

    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Detele a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const {userId} = req.params;
  const data = req.body;
  try {
    console.log("data: ", data);
    const ALLOWED_UPDATES = ['firstName', 'lastName', 'password', 'photoUrl', 'about', 'skills'];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k)
    });
    console.log("isUpdateAllowed: ", isUpdateAllowed);
    if(!isUpdateAllowed) {
      throw new Error('update not allowed');
    } else{ 
      const user = await User.findByIdAndUpdate({ _id: userId }, data, {
        returnDocument: "after",
      });
      console.log(user);
      res.send("User updated successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });