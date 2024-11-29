const express = require('express');
const app = express();

// define a route

app.get('/hello', (req, res) => {
    return res.send('hello');
});

app.get('/hello*ab', (req, res) => {
    return res.send('hello*ab');
});

// dynamic routes
app.get('/hello/:id', (req, res) => {
    return res.send('dynamic routes');
});

app.get('/hello/:id', (req, res) => {
    return res.send('dynamic routes');
});

app.get('/a+', (req, res) => {
    return res.send('a+ routes');
});

app.get('/a*', (req, res) => {
    return res.send('a* routes');
});

app.use('/', (req, res) => {
    res.send('Hello World!');
});

// start the server
const PORT = 3000;
app.listen(PORT, () => {
   console.log('listening on port ' + PORT); 
});