const express = require('express');
const app = express();

// When would if (err) be useful?
// If you define a middleware that tries to act as both a regular and error middleware (unusual).
// Or if you chain multiple error-handlers and want one to conditionally act based on the error value (like if err is a specific type).
// But in most cases — especially simple ones — you can skip the if (err) entirely in your error handlers.

app.use('/', (err, req, res, next) => {
    console.log('inside the wild card error handling at start.');
    if(err) { // the if (err) check is not strictly required in an error-handling middleware because Express only calls it when there is an error.
        res.status(500).send('something went wrong!')
    }
});

app.get('/user', (req, res) => {
    throw new Error('message')
    res.send('hello from user');
});

app.use('/', (err, req, res, next) => {
    console.log('inside the wild card error handling at end.');
    if(err) {
        res.status(500).send('something went wrong!')
    }
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});