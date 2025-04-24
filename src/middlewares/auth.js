const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminAuth = (req, res, next) => {
    console.log("middleware for authorization of admin routes");
    const token = "xyz";
    const authorized = token === "xyz";
    if(authorized) {
        next();
    } else{ 
        res.status(401).send("Unauthorized");
    }
}

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token: ", token);
    if(!token) {
        throw new Error("Token not valid");
    }
    const { _id } = jwt.verify(token, "DEVTINDER@02");
    console.log("_id: ", _id);
    const user = await User.findById(_id);
    if(!user) {
        throw new Error("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).send("Error: " + error.message);
  }
}

module.exports = { 
    adminAuth,
    userAuth
}