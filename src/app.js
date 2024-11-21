const express = require('express');
const app = express();

// define a route
app.use('/', (req, res) => {
    res.send('Hello World!');
});

// start the server
const PORT = 3000;
app.listen(PORT, () => {
   console.log('listening on port ' + PORT); 
});