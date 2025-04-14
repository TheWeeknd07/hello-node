const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect('mongodb://testfeb0202:test0202@ac-ktltat6-shard-00-00.xtkcnqk.mongodb.net:27017,ac-ktltat6-shard-00-01.xtkcnqk.mongodb.net:27017,ac-ktltat6-shard-00-02.xtkcnqk.mongodb.net:27017/devTinderDataBase?replicaSet=atlas-slmrod-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
}

module.exports = connectDB;