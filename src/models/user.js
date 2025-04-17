const mongoose = require('mongoose');

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

module.exports = mongoose.model("User", userSchema);