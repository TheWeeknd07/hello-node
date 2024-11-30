const express = require('express');
const app = express();

// define a route

app.get('/', (req, res, next) => {
    console.log("route /!");
    res.status(500).send('Something went wrong!');
    throw new Error('error passed!');
    // res.send('Hello World!');
});

app.get('/user', (req, res) => { 
    console.log('/user'); res.send('Hello World from /user !');
    throw new Error('error passed!');
});

app.use('/', (err, req, res, next) => {
    console.log('error handler function...');
});
// start the server
const PORT = 7777;
app.listen(PORT, () => {
   console.log('listening on port: ' + PORT); 
});