const validator = require('validator');

const validateSignupData = function (data) {
    const { firstName, emailId, password } = data;
    if(firstName.length < 4 || firstName.length > 20) {
        throw new Error("Invalid first name");
    }
    if(!validator.isEmail(emailId)) {
        throw new Error("Invalid email");
    }
    if(!validator.isStrongPassword(password, { minSymbols: 0 }) || password.length < 8) {
        throw new Error("Invalid password");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "photoUrl",
      "about",
      "skills",
    ];
  
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
  
    return isEditAllowed;
  };

module.exports = {
    validateSignupData,
    validateEditProfileData
}