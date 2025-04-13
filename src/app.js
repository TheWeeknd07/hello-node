const express = require('express');
const app = express();

// url: localhost:7777/hello, response: Hello from Server!!!

app.get('/hello',
    (req, res, next) => {
        // res.send('Response Handler 1');
        next();
    },
    (req, res, next) => {
        // res.send('Response Handler 2');
        next();
    },
    (req, res, next) => { // now it will look for next route handler or response handler callback
        // res.send('Response Handler 3');
        next();
    }
);

app.use((req, res) => {
    res.send('Hello from Server!!!');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});