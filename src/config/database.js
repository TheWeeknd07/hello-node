const mongoose = require('mongoose');
const connectDB = async () => {
  await mongoose.connect('mongodb+srv://testfeb0202:testfeb0202@cluster0.qyem1.mongodb.net/devTinder');
}

module.exports = connectDB;