const express = require("express");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validations");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      console.log(req.user);
      const user = req.user;
      res.send(user);
    } catch(error) {
      res.status(401).send("Error: " + error.message);
    }
});

// Update data of the user
profileRouter.patch("/profile/edit/:userId", async (req, res) => {
    const {userId} = req.params;
    const data = req.body;
    try {
      const isUpdateAllowed = validateEditProfileData(req);
      if(!isUpdateAllowed) {
        throw new Error('update not allowed');
      } else{ 
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
          returnDocument: "after",
        });
        res.send("User updated successfully");
      }
    } catch (err) {
      res.status(400).send("Something went wrong: " + err.message);
    }
});

module.exports = profileRouter;