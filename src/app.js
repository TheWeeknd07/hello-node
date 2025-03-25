const express = require('express');
const app = express();
const User = require('../src/models/user');

app.use(express.json());

app.post('/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send('user created...')
  } catch(error) {
    res.status(400).send('error creating user...' + error.message);
  }
});

const connectDB = require('../src/config/database');

connectDB().then(() => {
  console.log('database connection established...');
  const PORT = 7777;
  app.listen(PORT, () => {
    console.log('listening on port 7777');
  });
}).catch(() => {
    console.log('error connecting to database');
});
