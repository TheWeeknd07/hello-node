const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18
    },
    gender: {
      type: String,
      validate(value) {
        if(value !== 'male' || value !== 'female') {
          throw new Error("Gender should be either 'male' or 'female'")
        }
      }
    },
    photoUrl: {
      type: String,
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTciCtnrJfP3pSCEZUTGREEcK3-wWr2UJuZxQd42-12tvQ6zcxJ_jcrVWk&s'
    },
    about: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.getJWT = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id}, "DEVTINDER@02", { expiresIn: "7d"});
  return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);