const express = require('express');
const app = express();

app.use('/hello', (req, res) => {
    return res.send('Hello hello hello!!!');
});

app.use((req, res) => {
    return res.send('Hello from Server!!!');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});