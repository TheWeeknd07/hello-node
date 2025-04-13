const express = require('express');
const app = express();

const { adminAuth, userAuth } = require('./authenticate/auth');

app.use('/admin', adminAuth);

app.post('/user/login', (req, res) => {
    res.send('User Logged In Successfully');
});

app.get('/user/data', userAuth, (req, res) => {
    res.send('User Data');
});

app.get('/admin/getAllData', (req, res) =>{
    res.send('All Data');
});

app.post('/admin/deleteUser', (req, res) => {
    res.send('User Deleted');
});

app.use((req, res) => {
    res.send('Default route handler or Wild card handler!!!');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});