const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.post("/signup", async (req, res) => {
    // Creating a new instance of the User model
    const user = new User({
      firstName: "Sachin",
      lastName: "Tendulkar",
      emailId: "sachin@kohli.com",
      password: "sachin@123",
    });
  
    try {
      await user.save();
      res.send("User Added successfully!");
    } catch (err) {
      res.status(400).send("Error saving the user:" + err.message);
    }
  });

connectDB().then(() => {
    console.log('DB connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch((err) => {
    console.error('DB connection failed!', err)
});